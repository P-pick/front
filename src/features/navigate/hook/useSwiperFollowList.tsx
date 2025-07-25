import { useLayoutEffect, useRef } from 'react';
import { useStore } from 'zustand';

import { useMapController } from '@/features/map';
import { useFollowAlongStore } from '@/features/navigate';
import { useDebouncedCallback, type GeoTripLocation } from '@/shared';

import type { Swiper } from 'swiper/types';
import type { FollowBase } from '@/entities/navigate';

interface UseSwiperFollowListProps {
  followList: FollowBase[];
  start: GeoTripLocation;
}

export const useSwiperFollowList = ({
  followList,
  start,
}: UseSwiperFollowListProps) => {
  const swiperRef = useRef<Swiper | null>(null);
  const { handleSwitchLocationToPosition } = useMapController();
  const { currentFollowIndex } = useStore(useFollowAlongStore);

  const debouncedSwitchLocation = useDebouncedCallback(
    (position: GeoTripLocation) => {
      handleSwitchLocationToPosition(position, true);
    },
    300,
  );

  const handleSlideChange = (swiper: Swiper) => {
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
    handleSwitchLocationToPosition(start, true);
    swiperRef.current?.slideTo(currentFollowIndex, 500, false);
  }, [currentFollowIndex]);

  return {
    swiperRef,
    handleSlideChange,
    handleSwitchPositionAndSwiperToCurrentIndex,
  };
};
