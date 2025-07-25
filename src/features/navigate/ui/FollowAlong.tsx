import { useStore } from 'zustand';
import { useFollowAlongStore } from '@/features/navigate';
import useMapLevel from '../lib/useMapLevelStore';

export default function FollowAlong() {
  const { setIsFollowAlong, setCurrentFollowIndex } =
    useStore(useFollowAlongStore);
  const { setMapLevel } = useStore(useMapLevel);

  const handleFollowAlongButton = () => {
    setIsFollowAlong(true);
    setCurrentFollowIndex(0);
    setMapLevel(3);
  };

  return (
    <div className="w-full h-full z-(--z-layer2) bg-(--color-primary-red) text-white p-3">
      <button
        onClick={handleFollowAlongButton}
        className="w-full h-full cursor-pointer text-xs"
      >
        따라가기
      </button>
    </div>
  );
}
