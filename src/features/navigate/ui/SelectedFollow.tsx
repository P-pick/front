import { useLayoutEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useStore } from 'zustand';

import { useMapController } from '@/features/map';
import {
  FollowElement,
  PrefetchMap,
  useFollowAlongStore,
} from '@/features/navigate';
import { useDebouncedCallback } from '@/shared';

import type { Swiper as SwiperType } from 'swiper/types';
import type { PEDESTRIAN, CAR } from '@/entities/navigate';
import type { GeoTripLocation } from '@/shared';

interface SelectedFollowProps {
  followList: PEDESTRIAN.PedestrianFollowFeature[] | CAR.CarFollowFeature[];
  firstIndexPosition: GeoTripLocation;
}

export default function SelectedFollow({
  followList,
  firstIndexPosition,
}: SelectedFollowProps) {
  const { currentFollowIndex } = useStore(useFollowAlongStore);
  const { handleSwitchLocationToPosition } = useMapController();

  const swiperRef = useRef<SwiperType | null>(null);

  const debouncedSwitchLocation = useDebouncedCallback(
    (position: GeoTripLocation) => {
      handleSwitchLocationToPosition(position, true);
    },
    300,
  );

  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.realIndex;
    const currentPosition = followList[currentIndex].path[0];
    debouncedSwitchLocation(currentPosition);
  };

  const handleSwitchPositionAndSwiperToCurrentIndex = (
    position: GeoTripLocation,
    index: number,
  ) => {
    handleSwitchLocationToPosition(position, true);
    swiperRef.current?.slideTo(index, 500, false);
  };

  useLayoutEffect(() => {
    if (currentFollowIndex === -1) return;
    handleSwitchLocationToPosition(firstIndexPosition, true);
    swiperRef.current?.slideTo(currentFollowIndex, 500, false);
  }, [currentFollowIndex]);

  return (
    <>
      <PrefetchMap followList={followList} />
      <div className="flex-2 py-4 z-(--z-layer2)">
        <Swiper
          direction="horizontal"
          modules={[Navigation, Pagination]}
          freeMode={true}
          slidesPerView="auto"
          className="px-2 cursor-grab"
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          onRealIndexChange={handleSlideChange}
        >
          {followList.map((option, idx) => (
            <>
              <SwiperSlide
                key={option.id}
                className="mx-2 min-w-60 max-w-60"
                onClick={() =>
                  handleSwitchPositionAndSwiperToCurrentIndex(
                    option.path[0],
                    idx,
                  )
                }
              >
                <FollowElement key={option.id} option={option} idx={idx + 1} />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </>
  );
}
