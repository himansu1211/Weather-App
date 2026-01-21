import { TemperatureUnit } from '@/types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center bg-white rounded-full p-1 shadow-md border border-slate-200"
    >
      <span
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          unit === 'metric'
            ? 'bg-sky-500 text-white'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        °C
      </span>
      <span
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          unit === 'imperial'
            ? 'bg-sky-500 text-white'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        °F
      </span>
    </button>
  );
};
