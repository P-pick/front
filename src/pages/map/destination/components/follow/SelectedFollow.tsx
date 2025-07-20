import { useLayoutEffect, useRef } from 'react';
import { useDebouncedCallback } from '@/lib/useDebouncedCallback';
import type { CarFollowFeature, PedestrianFollowFeature } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';
import type { Swiper as SwiperType } from 'swiper/types';
import type { GeoTripLocation } from '@/pages/types';
import FollowElement from './FollowElement';
import PrefetchMap from './PrefetchMap';
import { useMapController } from '../../lib';

interface SelectedFollowProps {
  followList: PedestrianFollowFeature[] | CarFollowFeature[];
  firstIndexPosition: GeoTripLocation;
}

export default function SelectedFollow({
  followList,
  firstIndexPosition,
}: SelectedFollowProps) {
  const { currentFollowIndex } = useStore(useFollowAlong);
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
