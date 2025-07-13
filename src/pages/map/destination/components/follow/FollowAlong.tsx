import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';

export default function FollowAlong() {
  const { setIsFollowAlong, setCurrentFollowIndex } = useStore(useFollowAlong);

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
