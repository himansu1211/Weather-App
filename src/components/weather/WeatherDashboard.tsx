import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import { useGeolocation } from '@/hooks/useGeolocation';
import { WeatherMap } from './WeatherMap';
import { LocationInfo } from './LocationInfo';
import { CurrentWeather } from './CurrentWeather';
import { HourlyForecast } from './HourlyForecast';
import { WeeklyForecast } from './WeeklyForecast';
import { UnitToggle } from './UnitToggle';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export const WeatherDashboard = () => {
  const {
    weatherData,
    location,
    loading,
    error,
    unit,
    fetchWeather,
    toggleUnit,
    convertTemp,
  } = useWeather();

  const { getLocation, loading: locating } = useGeolocation();
  const [currentCoords, setCurrentCoords] = useState({ lat: 51.5074, lon: -0.1278 });
  const [initialized, setInitialized] = useState(false);
  const [mapMinimized, setMapMinimized] = useState(false);

  const handleLocationSelect = useCallback((lat: number, lon: number) => {
    setCurrentCoords({ lat, lon });
    fetchWeather(lat, lon);
  }, [fetchWeather]);

  const handleLocateMe = useCallback(async () => {
    try {
      const coords = await getLocation();
      setCurrentCoords({ lat: coords.lat, lon: coords.lon });
      fetchWeather(coords.lat, coords.lon);
      setMapMinimized(true);
    } catch (err) {
      console.error('Failed to get location:', err);
    }
  }, [getLocation, fetchWeather]);

  useEffect(() => {
    if (!initialized) {
      fetchWeather(currentCoords.lat, currentCoords.lon);
      setInitialized(true);
    }
  }, [initialized, fetchWeather, currentCoords]);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 lg:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800">
                WeatherSphere
              </h1>
              <p className="text-xs text-slate-500">
                Interactive Weather Dashboard
              </p>
            </div>
          </div>
          <UnitToggle unit={unit} onToggle={toggleUnit} />
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Map & Location */}
          <div className={`space-y-4 ${mapMinimized ? 'lg:col-span-4' : 'lg:col-span-5'}`}>
            <motion.div
              layout
              className="relative"
              transition={{ duration: 0.3 }}
            >
              <WeatherMap
                onLocationSelect={handleLocationSelect}
                onLocateMe={handleLocateMe}
                currentLat={currentCoords.lat}
                currentLon={currentCoords.lon}
                locationName={location?.name}
                currentTemp={weatherData?.current.temp}
                locating={locating}
                isMinimized={mapMinimized}
              />
            </motion.div>
            
            {/* Location Info Card */}
            <LocationInfo 
              location={location} 
              coordinates={currentCoords}
            />
          </div>

          {/* Right Column - Weather Data */}
          <div className={`space-y-6 ${mapMinimized ? 'lg:col-span-8' : 'lg:col-span-7'}`}>
            <AnimatePresence mode="wait">
              {loading && !weatherData ? (
                <LoadingState key="loading" />
              ) : error ? (
                <ErrorState 
                  key="error" 
                  message={error} 
                  onRetry={() => fetchWeather(currentCoords.lat, currentCoords.lon)} 
                />
              ) : weatherData ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <CurrentWeather
                    current={weatherData.current}
                    location={location}
                    unit={unit}
                    convertTemp={convertTemp}
                  />
                  <HourlyForecast
                    hourly={weatherData.hourly}
                    unit={unit}
                    convertTemp={convertTemp}
                  />
                  <WeeklyForecast
                    daily={weatherData.daily}
                    unit={unit}
                    convertTemp={convertTemp}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-400">
          <p>
            WeatherSphere © {new Date().getFullYear()} • Data refreshes on location change
          </p>
          <p className="mt-1 text-xs">
            Powered by Open-Meteo API • Location data from Nominatim
          </p>
        </footer>
      </div>
    </div>
  );
};
