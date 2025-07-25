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
    <div className="w-full h-full z-(--z-layer2) bg-(--color-primary-red) text-white p-3">
      <button
        onClick={handleFollowAlongButton}
        className="w-full h-full cursor-pointer"
      >
        따라가기
      </button>
    </div>
  );
}
