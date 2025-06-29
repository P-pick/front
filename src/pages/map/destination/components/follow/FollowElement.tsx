import { followInfo } from '@/pages/const/FOLLOW';
import type { CarFollowFeature, PedestrianFollowFeature } from '../../types';
import { SwiperSlide } from 'swiper/react';
import { DeleteIcon } from '@/assets';
import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';

interface FollowElementProps {
  option: CarFollowFeature | PedestrianFollowFeature;
  idx: number;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export default function FollowElement({
  option,
  idx,
  onClick,
}: FollowElementProps) {
  const { setIsFollowAlong } = useStore(useFollowAlong);

  const getStartAndEndIndex = (index: number) => {
    if (index === 0) {
      return 'S';
    } else if (index === idx) {
      return 'E';
    } else {
      return index;
    }
  };
  return (
    <SwiperSlide
      key={option.id}
      className="mx-2 min-w-60 max-w-60"
      onClick={onClick}
    >
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
            {getStartAndEndIndex(idx)}
          </span>
        </div>
        <p className="flex-1 text-xs text-white">{option.description}</p>
      </div>
      <div className="absolute right-5 top-3 cursor-pointer z-(--z-layer4) fill-white">
        <DeleteIcon onClick={() => setIsFollowAlong(false)} />
      </div>
    </SwiperSlide>
  );
}
