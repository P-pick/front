import type { GeoTripLocation } from '@/pages/types';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { useMapLevel } from '../store';

interface UseResizingMapLevel {
  points: GeoTripLocation[];
}

export const useResizingMapLevel = ({ points }: UseResizingMapLevel) => {
  const { setMapLevel } = useStore(useMapLevel);
  const map = useMap();

  kakao.maps.event.addListener(map, 'zoom_changed', () => {
    setMapLevel(map.getLevel());
  });

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    points.forEach(point => {
      bounds.extend(new kakao.maps.LatLng(point.lat!, point.lng!));
    });
    return bounds;
  }, [points]);

  useEffect(() => {
    if (map && points.length > 0) {
      map.setBounds(bounds, 100, 0, 100, 0);
      setMapLevel(map.getLevel());
    }
  }, [map]);

  const handleResizeMapLevel = () => {
    if (map) {
      map.setBounds(bounds, 100, 0, 100, 0);
    }
  };

  return { handleResizeMapLevel };
};
