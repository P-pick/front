import type { GeoTripLocation } from '@/pages/types';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import { useTransportation } from '../store';
import { useCurrentLocation } from '@/lib';
import { destinationSVG } from '@/assets';
import useFollowAlong from '../store/useFollowAlong';
import clsx from 'clsx';
import { useMapController } from '../lib';

interface ResizingMapProps {
  points: GeoTripLocation[];
}

export default function ResizingMap({ points }: ResizingMapProps) {
  const { searchOptions } = useStore(useTransportation);
  const { isFollowAlong } = useStore(useFollowAlong);
  const { map, handleMapResizing } = useMapController();

  const { geoLocation } = useCurrentLocation();
  useEffect(() => {
    handleMapResizing({ points });
  }, [map, searchOptions]);

  const goToMyLocation = () => [
    map.setCenter(new kakao.maps.LatLng(geoLocation.lat, geoLocation.lng)),
  ];

  const isFollowAlongMode = clsx({
    'absolute flex justify-between w-full px-4 bottom-45 z-(--z-layer3)':
      !isFollowAlong,
    'absolute flex justify-between w-full px-4 bottom-35 z-(--z-layer3)':
      isFollowAlong,
  });

  return (
    <>
      <div className={isFollowAlongMode}>
        <button
          onClick={() => handleMapResizing({ points })}
          className="bg-white border-1 border-black rounded-full py-0 px-5 flex items-center justify-center cursor-pointer text-xs"
        >
          모든 경로 보기
        </button>
        <button
          onClick={goToMyLocation}
          className="fill-black border-black  border-1 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer "
        >
          <destinationSVG.MyLocationIcon />
        </button>
      </div>
    </>
  );
}
