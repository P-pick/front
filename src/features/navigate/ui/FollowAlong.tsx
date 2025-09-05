import { useStore } from 'zustand';

import { useFollowAlongStore, useMapLevelStore } from '@/features/navigate';

export default function FollowAlong() {
  const { setCurrentFollowIndex } = useStore(useFollowAlongStore);
  const { setMapLevel } = useStore(useMapLevelStore);

  const handleFollowAlongButton = () => {
    setCurrentFollowIndex(0);
    setMapLevel(3);
  };

  return (
    <div className="w-full h-full z-(--z-layer2)">
      <button
        onClick={handleFollowAlongButton}
        className="w-full h-full cursor-pointer text-xs bg-(--color-primary-red) text-white p-3"
      >
        따라가기
      </button>
    </div>
  );
}
