import { useEffect, useMemo } from 'react';
import { useMap } from 'react-kakao-maps-sdk';

interface UseResizingMapLevel {
  points: { lat: number; lng: number }[];
}

export const useResizingMapLevel = ({ points }: UseResizingMapLevel) => {
  const map = useMap();
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    points.forEach(point => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  }, [points]);

  useEffect(() => {
    if (map && points.length > 0) {
      map.setBounds(bounds);
    }
  }, [points]);

  const handleResizeMapLevel = () => {
    if (map) {
      map.setBounds(bounds);
    }
  };

  return { handleResizeMapLevel };
};
