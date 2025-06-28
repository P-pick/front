import { useMemo, useRef } from 'react';
import { useTransportation } from '../../store';
import type { PolyFeatures } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { DeleteIcon } from '@/assets';
import { followInfo } from '@/pages/const/FOLLOW';
import { getSelectedTransportationFollow, useMapController } from '../../lib';
import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';
import type { Swiper as SwiperType } from 'swiper/types';
import type { GeoTripLocation } from '@/pages/types';

interface SelectedFollowProps {
  followFeatures: PolyFeatures;
}

export default function SelectedFollow({
  followFeatures,
}: SelectedFollowProps) {
  const { vehicle } = useTransportation();
  const { setIsFollowAlong } = useStore(useFollowAlong);
  const { handleSwitchLocationToPosition } = useMapController();

  const swiperRef = useRef<SwiperType | null>(null);

  const followList = useMemo(() => {
    return getSelectedTransportationFollow(vehicle, followFeatures);
  }, [vehicle, followFeatures]);

  const getStartAndEndIndex = (index: number) => {
    if (index === 0) {
      return 'S';
    } else if (index === followList.length - 1) {
      return 'E';
    } else {
      return index;
    }
  };

  const handleSwitchPositionAndSwiperToCurrentIndex = (
    position: GeoTripLocation,
    index: number
  ) => {
    handleSwitchLocationToPosition(position, true);
    swiperRef.current?.slideTo(index, 500, false);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-3/14 py-4 z-(--z-layer2)">
      <Swiper
        direction="horizontal"
        modules={[Navigation, Pagination]}
        freeMode={true}
        slidesPerView="auto"
        className="px-2 cursor-grab h-full"
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onRealIndexChange={swiper => {
          handleSwitchLocationToPosition(
            followList[swiper.realIndex].path[0],
            true
          );
        }}
      >
        {followList.map((option, idx) => (
          <>
            <SwiperSlide
              key={option.id}
              className="mx-2 min-w-60 max-w-60"
              onClick={() =>
                handleSwitchPositionAndSwiperToCurrentIndex(option.path[0], idx)
              }
            >
              <div className="w-full h-full border-2 border-(--color-primary-red) bg-(--color-primary-red) rounded-2xl p-2 flex flex-col items-start justify-center gap-2">
                <div className="flex gap-2">
                  <div>
                    <span>{followInfo[option.turnType].svg}</span>
                  </div>
                  <span className="flex justify-center items-center rounded-full bg-white text-black text-xs w-6 h-6 p-1">
                    {getStartAndEndIndex(idx)}
                  </span>
                </div>
                <p className="flex-1 text-xs text-white">
                  {option.description}
                </p>
              </div>
              <div className="absolute right-5 top-3 cursor-pointer z-(--z-layer4) fill-white">
                <DeleteIcon onClick={() => setIsFollowAlong(false)} />
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
