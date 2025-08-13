import { useStore } from 'zustand';

import { commonSVG } from '@/assets';
import { useFollowAlongStore } from '@/features/navigate';

import type { FollowBase } from '@/entities/navigate';

interface PublicTransitFollowElementProps {
  option: FollowBase;
  idx: number;
}

export default function PublicTransitFollowElement({
  option,
  idx,
}: PublicTransitFollowElementProps) {
  const { setIsFollowAlong } = useStore(useFollowAlongStore);

  return (
    <>
      <div className="w-full h-24 border-2 border-(--color-primary-red) bg-(--color-primary-red) rounded-2xl p-2 flex flex-col items-start justify-center gap-2">
        <div className="flex gap-2">
          <span className="flex justify-center items-center rounded-full bg-white text-black text-xs w-6 h-6 p-1">
            {idx}
          </span>
        </div>
        <p className="flex-1 text-xs text-white">{option.description}</p>
      </div>
      <div className="absolute right-5 top-3 cursor-pointer z-(--z-layer4) fill-white">
        <commonSVG.DeleteIcon
          onClick={() => setIsFollowAlong(false)}
          className="fill-white"
        />
      </div>
    </>
  );
}
