import { Calendar } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';
import { DailyWeather, TemperatureUnit } from '@/types/weather';

interface WeeklyForecastProps {
  daily: DailyWeather[];
  unit: TemperatureUnit;
  convertTemp: (temp: number) => number;
}

export const WeeklyForecast = ({ daily, unit, convertTemp }: WeeklyForecastProps) => {
  const formatDay = (timestamp: number, index: number) => {
    if (index === 0) return 'Today';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-sky-500" />
        <h3 className="text-lg font-semibold text-slate-800">7-Day Forecast</h3>
      </div>
      
      <div className="space-y-2">
        {daily.slice(0, 7).map((day, index) => {
          const weather = day.weather[0];
          
          return (
            <div
              key={day.dt}
              className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                index === 0 ? 'bg-sky-50 border border-sky-100' : 'hover:bg-slate-50'
              }`}
            >
              {/* Day name */}
              <div className="w-20 flex-shrink-0">
                <p className="text-sm font-semibold text-slate-800">{formatDay(day.dt, index)}</p>
                <p className="text-xs text-slate-400">{formatDate(day.dt)}</p>
              </div>

              {/* Weather icon and description */}
              <div className="flex items-center gap-2 flex-1">
                <WeatherIcon 
                  weatherId={weather.id} 
                  icon={weather.icon} 
                  size={28} 
                  className="text-amber-400"
                />
                <span className="text-xs text-slate-500 capitalize hidden sm:block truncate max-w-[100px]">
                  {weather.description}
                </span>
              </div>

              {/* Precipitation */}
              <div className="w-12 text-right">
                {day.pop > 0.1 && (
                  <span className="text-xs text-sky-500 font-medium">
                    {Math.round(day.pop * 100)}%
                  </span>
                )}
              </div>

              {/* Temperature */}
              <div className="flex items-center gap-2 w-20 justify-end">
                <span className="text-sm font-bold text-slate-800">
                  {convertTemp(day.temp.max)}°
                </span>
                <span className="text-sm text-slate-400">
                  {convertTemp(day.temp.min)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
