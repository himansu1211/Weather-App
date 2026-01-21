import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
        <p className="mt-4 text-slate-600 font-medium">Loading weather data...</p>
        <p className="text-sm text-slate-400 mt-1">Please wait a moment</p>
      </div>
    </div>
  );
};
