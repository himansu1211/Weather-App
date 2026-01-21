import { MapPin, Globe } from 'lucide-react';
import { LocationInfo as LocationInfoType } from '@/types/weather';

interface LocationInfoProps {
  location: LocationInfoType | null;
  coordinates: { lat: number; lon: number };
}

export const LocationInfo = ({ location, coordinates }: LocationInfoProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-sky-500" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800">
            {location?.name || 'Unknown Location'}
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Globe className="w-4 h-4" />
            <span>{location?.country || 'N/A'}</span>
            <span className="text-slate-300">•</span>
            <span>
              {coordinates.lat.toFixed(2)}°, {coordinates.lon.toFixed(2)}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
