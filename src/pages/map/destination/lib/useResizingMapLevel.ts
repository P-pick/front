import type { GeoTripLocation } from '@/pages/types';
import { useMemo } from 'react';
import { useMap } from 'react-kakao-maps-sdk';

interface UseResizingMapLevel {
  points: GeoTripLocation[];
}

export const useResizingMapLevel = ({ points }: UseResizingMapLevel) => {
  const map = useMap();

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    points.forEach(point => {
      bounds.extend(new kakao.maps.LatLng(point.lat!, point.lng!));
    });
    return bounds;
  }, [points]);

  const handleMapResizing = () => {
    if (map && points.length > 0) {
      map.setBounds(bounds, 100, 0, 150, 0);
    }
  };

  return { map, handleMapResizing };
};
