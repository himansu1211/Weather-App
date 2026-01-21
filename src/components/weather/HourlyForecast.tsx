import { Clock } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';
import { HourlyWeather, TemperatureUnit } from '@/types/weather';

interface HourlyForecastProps {
  hourly: HourlyWeather[];
  unit: TemperatureUnit;
  convertTemp: (temp: number) => number;
}

export const HourlyForecast = ({ hourly, unit, convertTemp }: HourlyForecastProps) => {
  const next24Hours = hourly.slice(0, 24);

  const formatHour = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  return (
    <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-sky-500" />
        <h3 className="text-lg font-semibold text-slate-800">24-Hour Forecast</h3>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {next24Hours.map((hour, index) => {
          const weather = hour.weather[0];
          const isNow = index === 0;
          
          return (
            <div
              key={hour.dt}
              className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl min-w-[70px] transition-colors ${
                isNow ? 'bg-sky-500 text-white' : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <span className={`text-xs font-medium ${isNow ? 'text-white/80' : 'text-slate-500'}`}>
                {isNow ? 'Now' : formatHour(hour.dt)}
              </span>
              <WeatherIcon 
                weatherId={weather.id} 
                icon={weather.icon} 
                size={28} 
                className={isNow ? 'text-white' : 'text-amber-400'}
              />
              <span className={`text-sm font-bold ${isNow ? 'text-white' : 'text-slate-800'}`}>
                {convertTemp(hour.temp)}°
              </span>
              {hour.pop > 0.1 && (
                <span className={`text-xs ${isNow ? 'text-white/70' : 'text-sky-500'}`}>
                  {Math.round(hour.pop * 100)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
