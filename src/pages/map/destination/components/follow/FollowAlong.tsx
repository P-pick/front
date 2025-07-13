import type { GeoTripLocation } from '@/pages/types';
import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';
import { useMapController } from '../../lib';

interface FollowAlongProps {
  firstIndex: GeoTripLocation;
}

export default function FollowAlong({ firstIndex }: FollowAlongProps) {
  const { setIsFollowAlong, setCurrentFollowIndex } = useStore(useFollowAlong);
  const { handleSwitchLocationToPosition } = useMapController();

  const handleFollowAlongButton = () => {
    handleSwitchLocationToPosition(firstIndex, true, 3);
    setIsFollowAlong(true);
    setCurrentFollowIndex(0);
  };

  return (
    <div className="absolute bottom-0 left-0 z-(--z-layer2) w-full h-1/12">
      <button
        onClick={handleFollowAlongButton}
        className="w-full h-full bg-(--color-primary-red) flex justify-center items-center text-xs text-white cursor-pointer"
      >
        따라가기
      </button>
    </div>
  );
}
