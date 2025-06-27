import type { GeoTripLocation } from '@/pages/types';
import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';
import { useMapController } from '../../lib';

interface FollowAlongProps {
  firstIndex: GeoTripLocation;
}

export default function FollowAlong({ firstIndex }: FollowAlongProps) {
  const { setIsFollowAlong } = useStore(useFollowAlong);
  const { handleSwitchLocationToPosition } = useMapController();

  return (
    <div className="absolute -bottom-3 left-0 z-(--z-layer2) w-full h-1/7 py-3">
      <button
        onClick={() => {
          handleSwitchLocationToPosition(firstIndex, true, 3);
          setIsFollowAlong(true);
        }}
        className="w-full h-full bg-(--color-primary-red) flex pt-4 justify-center text-xs text-white cursor-pointer"
      >
        따라가기
      </button>
    </div>
  );
}
