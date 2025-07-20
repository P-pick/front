import { followInfo } from '@/pages/const/FOLLOW';
import { commonSVG } from '@/assets';
import { useStore } from 'zustand';
import type { CarFollowFeature, PedestrianFollowFeature } from '../types';
import useFollowAlong from '../store/useFollowAlong';

interface FollowElementProps {
  option: CarFollowFeature | PedestrianFollowFeature;
  idx: number;
}

export default function FollowElement({ option, idx }: FollowElementProps) {
  const { setIsFollowAlong } = useStore(useFollowAlong);

  return (
    <>
      <div className="w-full h-full border-2 border-(--color-primary-red) bg-(--color-primary-red) rounded-2xl p-2 flex flex-col items-start justify-center gap-2">
        <div className="flex gap-2">
          <div>
            <span>
              {followInfo[option.turnType]
                ? followInfo[option.turnType].svg
                : null}
            </span>
          </div>
          <span className="flex justify-center items-center rounded-full bg-white text-black text-xs w-6 h-6 p-1">
            {idx}
          </span>
        </div>
        <p className="flex-1 text-xs text-white">{option.description}</p>
      </div>
      <div className="absolute right-5 top-3 cursor-pointer z-(--z-layer4) fill-white">
        <commonSVG.DeleteIcon onClick={() => setIsFollowAlong(false)} />
      </div>
    </>
  );
}
