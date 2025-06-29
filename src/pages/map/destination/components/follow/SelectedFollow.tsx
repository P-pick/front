import { useLayoutEffect, useMemo, useRef } from 'react';
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
import FollowElement from './FollowElement';

interface SelectedFollowProps {
  followFeatures: PolyFeatures;
}

export default function SelectedFollow({
  followFeatures,
}: SelectedFollowProps) {
  const { vehicle } = useTransportation();
  const { currentFollowIndex } = useStore(useFollowAlong);
  const { handleSwitchLocationToPosition } = useMapController();

  const swiperRef = useRef<SwiperType | null>(null);

  const followList = useMemo(() => {
    return getSelectedTransportationFollow(vehicle, followFeatures);
  }, [vehicle, followFeatures]);

  const handleSwitchPositionAndSwiperToCurrentIndex = (
    position: GeoTripLocation,
    index: number
  ) => {
    handleSwitchLocationToPosition(position, true);
    swiperRef.current?.slideTo(index, 500, false);
  };

  useLayoutEffect(() => {
    swiperRef.current?.slideTo(currentFollowIndex, 500, false);
  }, [currentFollowIndex]);

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
            <FollowElement
              option={option}
              idx={idx}
              onClick={() =>
                handleSwitchPositionAndSwiperToCurrentIndex(option.path[0], idx)
              }
            />
          </>
        ))}
      </Swiper>
    </div>
  );
}
