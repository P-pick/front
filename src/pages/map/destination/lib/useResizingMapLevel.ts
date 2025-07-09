import type { GeoTripLocation } from '@/pages/types';
import { useMap } from 'react-kakao-maps-sdk';

interface UseResizingMapLevel {
  points: GeoTripLocation[];
}

export const useResizingMapLevel = () => {
  const map = useMap();

  const handleMapResizing = ({ points }: UseResizingMapLevel) => {
    const bounds = new kakao.maps.LatLngBounds();
    points.forEach(point => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    if (map && points.length > 0) {
      map.setBounds(bounds);
    }
  };

  return { map, handleMapResizing };
};
