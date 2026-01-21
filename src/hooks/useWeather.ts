import { useState, useCallback, useEffect } from 'react';
import { WeatherData, TemperatureUnit, LocationInfo, WeatherTheme } from '@/types/weather';
import { WEATHER_API, GEOCODE_API, REVERSE_API, OWM_KEY } from '@/lib/constants';

// Open-Meteo weather code mappings
const getWeatherMain = (code: number): string => {
  if (code === 0) return 'Clear';
  if (code >= 1 && code <= 3) return 'Clouds';
  if (code === 45 || code === 48) return 'Fog';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain';
  if (code === 85 || code === 86) return 'Snow';
  if (code >= 95) return 'Thunderstorm';
  return 'Clear';
};

const getWeatherDescription = (code: number): string => {
  switch (code) {
    case 0: return 'clear sky';
    case 1: return 'mainly clear';
    case 2: return 'partly cloudy';
    case 3: return 'overcast';
    case 45: return 'fog';
    case 48: return 'rime fog';
    case 51: return 'light drizzle';
    case 53: return 'moderate drizzle';
    case 55: return 'dense drizzle';
    case 56: return 'light freezing drizzle';
    case 57: return 'dense freezing drizzle';
    case 61: return 'slight rain';
    case 63: return 'moderate rain';
    case 65: return 'heavy rain';
    case 66: return 'light freezing rain';
    case 67: return 'heavy freezing rain';
    case 71: return 'slight snow fall';
    case 73: return 'moderate snow fall';
    case 75: return 'heavy snow fall';
    case 77: return 'snow grains';
    case 80: return 'slight rain showers';
    case 81: return 'moderate rain showers';
    case 82: return 'violent rain showers';
    case 85: return 'slight snow showers';
    case 86: return 'heavy snow showers';
    case 95: return 'thunderstorm';
    case 96: return 'thunderstorm with slight hail';
    case 99: return 'thunderstorm with heavy hail';
    default: return 'clear sky';
  }
};

const getWeatherIcon = (code: number): string => {
  // Map to OpenWeatherMap style icons (day/night not distinguished here)
  if (code === 0) return '01d';
  if (code === 1) return '01d';
  if (code === 2) return '02d';
  if (code === 3) return '04d';
  if (code === 45 || code === 48) return '50d';
  if (code >= 51 && code <= 57) return '09d';
  if (code >= 61 && code <= 67) return '10d';
  if (code >= 71 && code <= 77) return '13d';
  if (code >= 80 && code <= 82) return '09d';
  if (code === 85 || code === 86) return '13d';
  if (code >= 95) return '11d';
  return '01d';
};

// Mock data for demonstration (when API key is 'demo')
const generateMockWeather = (lat: number, lon: number): WeatherData => {
  const now = Math.floor(Date.now() / 1000);
  const baseTemp = 22 + Math.random() * 8;

  return {
    lat,
    lon,
    timezone: 'Europe/London',
    current: {
      dt: now,
      sunrise: now - 21600,
      sunset: now + 21600,
      temp: baseTemp,
      feels_like: baseTemp - 2,
      pressure: 1013,
      humidity: 65,
      uvi: 5.2,
      clouds: 25,
      visibility: 10000,
      wind_speed: 4.5,
      wind_deg: 180,
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    },
    hourly: Array.from({ length: 24 }, (_, i) => ({
      dt: now + i * 3600,
      temp: baseTemp + Math.sin(i / 4) * 5,
      feels_like: baseTemp + Math.sin(i / 4) * 5 - 2,
      pressure: 1013,
      humidity: 60 + Math.random() * 20,
      clouds: Math.floor(Math.random() * 50),
      wind_speed: 3 + Math.random() * 5,
      weather: [{
        id: i % 3 === 0 ? 801 : 800,
        main: i % 3 === 0 ? 'Clouds' : 'Clear',
        description: i % 3 === 0 ? 'few clouds' : 'clear sky',
        icon: i > 6 && i < 20 ? '01d' : '01n'
      }],
      pop: Math.random() * 0.3,
    })),
    daily: Array.from({ length: 7 }, (_, i) => ({
      dt: now + i * 86400,
      sunrise: now + i * 86400 - 21600,
      sunset: now + i * 86400 + 21600,
      temp: {
        day: baseTemp + i - 3,
        min: baseTemp - 5 + i,
        max: baseTemp + 5 + i,
        night: baseTemp - 3 + i,
        eve: baseTemp + 2 + i,
        morn: baseTemp - 4 + i,
      },
      feels_like: {
        day: baseTemp + i - 5,
        night: baseTemp - 5 + i,
        eve: baseTemp + i,
        morn: baseTemp - 6 + i,
      },
      pressure: 1010 + Math.floor(Math.random() * 10),
      humidity: 55 + Math.floor(Math.random() * 25),
      wind_speed: 3 + Math.random() * 6,
      weather: [{
        id: [800, 801, 802, 500, 800, 803, 800][i],
        main: ['Clear', 'Clouds', 'Clouds', 'Rain', 'Clear', 'Clouds', 'Clear'][i],
        description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain', 'clear sky', 'broken clouds', 'clear sky'][i],
        icon: ['01d', '02d', '03d', '10d', '01d', '04d', '01d'][i]
      }],
      clouds: Math.floor(Math.random() * 60),
      pop: Math.random() * 0.5,
      uvi: 4 + Math.random() * 4,
    })),
  };
};

const mockLocations: Record<string, LocationInfo> = {
  default: { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
};

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem('weatherUnit');
    return (saved as TemperatureUnit) || 'metric';
  });

  useEffect(() => {
    localStorage.setItem('weatherUnit', unit);
  }, [unit]);

  const fetchLocationName = async (lat: number, lon: number): Promise<LocationInfo> => {
    if (OWM_KEY === 'demo') {
      return { name: 'Demo City', country: 'WS', lat, lon };
    }

    try {
      const response = await fetch(
        `${REVERSE_API}?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        const address = data.address || {};
        return {
          name: data.name || address.city || address.town || address.village || 'Unknown',
          country: address.country_code ? address.country_code.toUpperCase() : '',
          lat,
          lon,
        };
      }
    } catch (err) {
      console.error('Error fetching location:', err);
    }
    return { name: 'Unknown', country: '', lat, lon };
  };

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch location name
      const locationInfo = await fetchLocationName(lat, lon);
      setLocation(locationInfo);

      if (OWM_KEY === 'demo') {
        // Use mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        setWeatherData(generateMockWeather(lat, lon));
      } else {
        // Open-Meteo API call
        const response = await fetch(
          `${WEATHER_API}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=auto&temperature_unit=${unit === 'metric' ? 'celsius' : 'fahrenheit'}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        // Transform Open-Meteo data to match our WeatherData interface
        const transformedData: WeatherData = {
          lat,
          lon,
          timezone: data.timezone || 'UTC',
          current: {
            dt: Math.floor(Date.now() / 1000),
            sunrise: data.daily?.sunrise ? Math.floor(new Date(data.daily.sunrise[0]).getTime() / 1000) : 0,
            sunset: data.daily?.sunset ? Math.floor(new Date(data.daily.sunset[0]).getTime() / 1000) : 0,
            temp: data.hourly?.temperature_2m?.[0] || 0,
            feels_like: data.hourly?.temperature_2m?.[0] || 0, // Open-Meteo doesn't provide feels_like
            pressure: 1013, // Open-Meteo doesn't provide pressure in basic plan
            humidity: data.hourly?.relative_humidity_2m?.[0] || 0,
            uvi: 0, // Open-Meteo doesn't provide UVI in basic plan
            clouds: 0, // Open-Meteo doesn't provide cloud cover in basic plan
            visibility: 10000,
            wind_speed: data.hourly?.wind_speed_10m?.[0] || 0,
            wind_deg: data.hourly?.wind_direction_10m?.[0] || 0,
            weather: [{
              id: data.hourly?.weather_code?.[0] || 0,
              main: getWeatherMain(data.hourly?.weather_code?.[0] || 0),
              description: getWeatherDescription(data.hourly?.weather_code?.[0] || 0),
              icon: getWeatherIcon(data.hourly?.weather_code?.[0] || 0)
            }]
          },
          hourly: data.hourly?.time?.slice(0, 24).map((time: string, index: number) => ({
            dt: Math.floor(new Date(time).getTime() / 1000),
            temp: data.hourly.temperature_2m[index],
            feels_like: data.hourly.temperature_2m[index],
            pressure: 1013,
            humidity: data.hourly.relative_humidity_2m[index],
            clouds: 0,
            wind_speed: data.hourly.wind_speed_10m[index],
            weather: [{
              id: data.hourly.weather_code[index],
              main: getWeatherMain(data.hourly.weather_code[index]),
              description: getWeatherDescription(data.hourly.weather_code[index]),
              icon: getWeatherIcon(data.hourly.weather_code[index])
            }],
            pop: (data.hourly.precipitation_probability?.[index] || 0) / 100
          })) || [],
          daily: data.daily?.time?.map((time: string, index: number) => ({
            dt: Math.floor(new Date(time).getTime() / 1000),
            sunrise: Math.floor(new Date(data.daily.sunrise[index]).getTime() / 1000),
            sunset: Math.floor(new Date(data.daily.sunset[index]).getTime() / 1000),
            temp: {
              day: data.daily.temperature_2m_max[index],
              min: data.daily.temperature_2m_min[index],
              max: data.daily.temperature_2m_max[index],
              night: data.daily.temperature_2m_min[index],
              eve: data.daily.temperature_2m_max[index],
              morn: data.daily.temperature_2m_min[index]
            },
            feels_like: {
              day: data.daily.temperature_2m_max[index],
              night: data.daily.temperature_2m_min[index],
              eve: data.daily.temperature_2m_max[index],
              morn: data.daily.temperature_2m_min[index]
            },
            pressure: 1013,
            humidity: 50,
            wind_speed: 0,
            weather: [{
              id: data.daily.weather_code[index],
              main: getWeatherMain(data.daily.weather_code[index]),
              description: getWeatherDescription(data.daily.weather_code[index]),
              icon: getWeatherIcon(data.daily.weather_code[index])
            }],
            clouds: 0,
            pop: (data.daily.precipitation_probability_max?.[index] || 0) / 100,
            uvi: 0
          })) || []
        };

        setWeatherData(transformedData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [unit]);

  const getWeatherTheme = useCallback((): WeatherTheme => {
    if (!weatherData?.current) return 'clear';

    const { weather, sunrise, sunset, dt } = weatherData.current;
    const weatherId = weather[0]?.id || 800;
    const isNight = dt < sunrise || dt > sunset;

    if (isNight) return 'night';
    if (weatherId >= 200 && weatherId < 300) return 'storm';
    if (weatherId >= 300 && weatherId < 600) return 'rain';
    if (weatherId >= 600 && weatherId < 700) return 'snow';
    if (weatherId >= 700 && weatherId < 800) return 'mist';
    if (weatherId === 800) return 'clear';
    if (weatherId > 800) return 'clouds';

    return 'clear';
  }, [weatherData]);

  const toggleUnit = useCallback(() => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  }, []);

  const convertTemp = useCallback((temp: number): number => {
    if (unit === 'imperial') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  }, [unit]);

  return {
    weatherData,
    location,
    loading,
    error,
    unit,
    fetchWeather,
    toggleUnit,
    getWeatherTheme,
    convertTemp,
  };
};
