import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherMapProps {
  onLocationSelect: (lat: number, lon: number) => void;
  onLocateMe: () => void;
  currentLat?: number;
  currentLon?: number;
  locationName?: string;
  currentTemp?: number;
  locating?: boolean;
  isMinimized?: boolean;
}

export const WeatherMap = ({
  onLocationSelect,
  onLocateMe,
  currentLat = 51.5074,
  currentLon = -0.1278,
  locationName,
  currentTemp,
  locating = false,
  isMinimized = false,
}: WeatherMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([currentLat, currentLon], 10);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="relative">
          <div class="absolute -translate-x-1/2 -translate-y-full">
            <div class="bg-sky-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
              ${locationName || 'Selected Location'}
              ${currentTemp !== undefined ? `<span class="ml-2">${Math.round(currentTemp)}°</span>` : ''}
            </div>
            <div class="w-3 h-3 bg-sky-500 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5"></div>
          </div>
          <div class="w-4 h-4 bg-sky-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });

    markerRef.current = L.marker([currentLat, currentLon], { icon: customIcon }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="relative">
          <div class="absolute -translate-x-1/2 -translate-y-full">
            <div class="bg-sky-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
              ${locationName || 'Selected Location'}
              ${currentTemp !== undefined ? `<span class="ml-2">${Math.round(currentTemp)}°</span>` : ''}
            </div>
            <div class="w-3 h-3 bg-sky-500 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5"></div>
          </div>
          <div class="w-4 h-4 bg-sky-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });

    markerRef.current.setLatLng([currentLat, currentLon]);
    markerRef.current.setIcon(customIcon);
    mapInstanceRef.current.setView([currentLat, currentLon], mapInstanceRef.current.getZoom(), {
      animate: true,
      duration: 0.5,
    });
  }, [currentLat, currentLon, locationName, currentTemp]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 300);
    }
  }, [isMinimized]);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 transition-all duration-300 ${
        isMinimized ? 'w-[280px] h-[200px]' : 'w-full h-[300px] lg:h-[400px]'
      }`}
    >
      <div 
        ref={mapRef} 
        className="w-full h-full z-0"
        style={{ background: '#f1f5f9' }}
      />
      
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-[1000]">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md flex items-center gap-2">
          <MapPin className="w-4 h-4 text-sky-500" />
          <span className="text-sm text-slate-700">Click map to select</span>
        </div>
        
        <Button
          onClick={onLocateMe}
          disabled={locating}
          size="sm"
          className="bg-sky-500 hover:bg-sky-600 text-white shadow-md"
        >
          {locating ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Navigation className="w-4 h-4 mr-2" />
          )}
          {locating ? 'Locating...' : 'Locate Me'}
        </Button>
      </div>
    </div>
  );
};
