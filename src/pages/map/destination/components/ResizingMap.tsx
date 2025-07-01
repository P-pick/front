import type { GeoTripLocation } from '@/pages/types';
import { useResizingMapLevel } from '../lib/useResizingMapLevel';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import { useTransportation } from '../store';
import { useCurrentLocation } from '@/lib';
import { destinationSVG } from '@/assets';
import useFollowAlong from '../store/useFollowAlong';
import clsx from 'clsx';

interface ResizingMapProps {
  points: GeoTripLocation[];
}

export default function ResizingMap({ points }: ResizingMapProps) {
  const { searchOptions } = useStore(useTransportation);
  const { isFollowAlong } = useStore(useFollowAlong);
  const { map, handleMapResizing } = useResizingMapLevel({
    points,
  });

  const { geoLocation } = useCurrentLocation();
  useEffect(() => {
    handleMapResizing();
  }, [map, searchOptions]);

  const goToMyLocation = () => [
    geoLocation &&
      map &&
      map.setCenter(new kakao.maps.LatLng(geoLocation.lat, geoLocation.lng)),
  ];

  const isFollowAlongMode = clsx({
    'absolute right-5 bottom-45 z-(--z-layer3)': !isFollowAlong,
    'absolute right-5 bottom-35 z-(--z-layer3)': isFollowAlong,
  });

  return (
    <div className={isFollowAlongMode}>
      <button
        onClick={goToMyLocation}
        className="fill-black w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer "
      >
        <destinationSVG.MyLocationIcon />
      </button>
    </div>
  );
}
