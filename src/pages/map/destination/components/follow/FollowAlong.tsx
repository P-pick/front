import type { GeoTripLocation } from '@/pages/types';
import { useMap } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';

interface FollowAlongProps {
  firstIndex: GeoTripLocation;
}

export default function FollowAlong({ firstIndex }: FollowAlongProps) {
  const map = useMap();
  const { setIsFollowAlong } = useStore(useFollowAlong);

  const handleFollowAlongFirstIndex = () => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(firstIndex.lat!, firstIndex.lng!));
    }
    map.setLevel(3, { animate: { duration: 500 } });
    setIsFollowAlong(true);
  };

  return (
    <div className="absolute -bottom-3 left-0 z-(--z-layer2) w-full h-1/7 py-3">
      <button
        onClick={handleFollowAlongFirstIndex}
        className="w-full h-full bg-(--color-primary-red) flex pt-4 justify-center text-xs text-white cursor-pointer"
      >
        따라가기
      </button>
    </div>
  );
}
