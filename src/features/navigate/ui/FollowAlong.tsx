import { useStore } from 'zustand';
import { useFollowAlongStore } from '@/features/navigate';

export default function FollowAlong() {
  const { setIsFollowAlong, setCurrentFollowIndex } =
    useStore(useFollowAlongStore);

  const handleFollowAlongButton = () => {
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
