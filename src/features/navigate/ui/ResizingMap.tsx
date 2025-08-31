import { useEffect } from 'react';
import { useStore } from 'zustand';

import { destinationSVG } from '@/assets';

import { useMapController } from '@/features/map';
import {
  useFollowAlongStore,
  useTransportationStore,
} from '@/features/navigate';

import { getSuspenseLocation, type GeoTripLocation } from '@/shared';

interface ResizingMapProps {
  points: GeoTripLocation[];
  viewBounds?: [number, number, number, number];
}

export default function ResizingMap({
  points,
  viewBounds = [0, 0, 0, 0],
}: ResizingMapProps) {
  const { searchOptions } = useStore(useTransportationStore);
  const { isFollowAlong } = useStore(useFollowAlongStore);
  const { map } = useMapController();

  const handleMapResizing = ({ points }: Pick<ResizingMapProps, 'points'>) => {
    const bounds = new kakao.maps.LatLngBounds();
    points.forEach(point => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    if (map && points.length > 0) {
      map.setBounds(
        bounds,
        viewBounds[0],
        viewBounds[1],
        viewBounds[2],
        viewBounds[3],
      );
    }
  };

  const geoLocation = getSuspenseLocation();
  useEffect(() => {
    if (!isFollowAlong) {
      handleMapResizing({ points });
    }
  }, [map, searchOptions, isFollowAlong]);

  const goToMyLocation = () => {
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(geoLocation.lat, geoLocation.lng));
    map.setBounds(
      bounds,
      viewBounds[0],
      viewBounds[1],
      viewBounds[2],
      viewBounds[3],
    );
  };

  return (
    <>
      <div className="shrink flex justify-between w-full p-4">
        <button
          onClick={() => handleMapResizing({ points })}
          className="bg-white border-1 border-black rounded-full py-0 px-5 flex items-center justify-center cursor-pointer text-xs z-(--z-layer2)"
        >
          모든 경로 보기
        </button>
        <button
          onClick={goToMyLocation}
          className="fill-black border-black  border-1 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer z-(--z-layer2)"
        >
          <destinationSVG.MyLocationIcon />
        </button>
      </div>
    </>
  );
}
