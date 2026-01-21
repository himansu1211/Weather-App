import { Droplets, Wind, Eye, Gauge, Thermometer, Sun } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';
import { CurrentWeather as CurrentWeatherType, LocationInfo, TemperatureUnit } from '@/types/weather';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  location: LocationInfo | null;
  unit: TemperatureUnit;
  convertTemp: (temp: number) => number;
}

export const CurrentWeather = ({ current, location, unit, convertTemp }: CurrentWeatherProps) => {
  const weather = current.weather[0];
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  const stats = [
    { icon: Droplets, label: 'Humidity', value: `${current.humidity}%`, bg: 'bg-sky-100', iconColor: 'text-sky-500' },
    { icon: Wind, label: 'Wind', value: `${Math.round(current.wind_speed)} ${unit === 'metric' ? 'm/s' : 'mph'}`, bg: 'bg-teal-100', iconColor: 'text-teal-500' },
    { icon: Thermometer, label: 'Feels Like', value: `${convertTemp(current.feels_like)}${unitSymbol}`, bg: 'bg-orange-100', iconColor: 'text-orange-500' },
    { icon: Eye, label: 'Visibility', value: `${(current.visibility / 1000).toFixed(1)} km`, bg: 'bg-violet-100', iconColor: 'text-violet-500' },
    { icon: Gauge, label: 'Pressure', value: `${current.pressure} hPa`, bg: 'bg-rose-100', iconColor: 'text-rose-500' },
    { icon: Sun, label: 'UV Index', value: current.uvi.toFixed(1), bg: 'bg-amber-100', iconColor: 'text-amber-500' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Main Temperature Display */}
        <div className="flex items-center gap-6">
          <WeatherIcon 
            weatherId={weather.id} 
            icon={weather.icon} 
            size={80} 
            className="text-amber-400"
          />
          <div>
            <div className="flex items-start">
              <span className="text-7xl lg:text-8xl font-bold text-slate-800">
                {convertTemp(current.temp)}
              </span>
              <span className="text-2xl text-slate-500 mt-2">{unitSymbol}</span>
            </div>
            <p className="text-lg text-slate-600 capitalize mt-1">
              {weather.description}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className="text-xs text-slate-500">{stat.label}</span>
              <span className="text-sm font-semibold text-slate-700">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
