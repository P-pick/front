import { useState } from 'react';

import {
  persistSlideSession,
  TourBottomSheet,
  TourSwiperLoadingOverlay,
  useInfiniteSwiperControl,
  useTourSwiperInfiniteQuery,
  withGeoTripParams,
} from '@/features/tour';
import { TourSwiperView } from '@/features/tourShort';
import type { AroundContentTypeId } from '@/entities/tour';
import type { GeoTripLocation } from '@/shared';

import type { Swiper as SwiperType } from 'swiper/types';

interface TourSwiperContainerProps {
  location: GeoTripLocation;
  distance: string;
  tourContentTypeId: AroundContentTypeId;
}

function TourSwiperContainer({
  location,
  distance,
  tourContentTypeId,
}: TourSwiperContainerProps) {
  const { slideEntries, fetchAppend, fetchPrepend, isFetchingPreviousPage } =
    useTourSwiperInfiniteQuery({
      location,
      radius: distance,
      contentTypeId: tourContentTypeId,
    });
  const { swiperRef, onSwiper, handlePrepend, handleAppend, isInitializing } =
    useInfiniteSwiperControl({
      fetchPrepend,
      fetchAppend,
    });

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const currentSlide = slideEntries[swiperRef.current?.activeIndex ?? 0].slide;

  const handleSlideChange = (swiper: SwiperType) => {
    const index = swiper.activeIndex;
    persistSlideSession({
      slideEntries: slideEntries[index],
      activeIndex: index,
    });
  };

  return (
    <>
      <TourSwiperLoadingOverlay
        isInitializing={isInitializing}
        isFetchingPreviousPage={isFetchingPreviousPage}
      />

      <TourSwiperView
        handleAppend={handleAppend}
        handlePrepend={handlePrepend}
        handleSlideChange={handleSlideChange}
        onSwiper={onSwiper}
        slideEntries={slideEntries}
        openBottomSheet={() => setIsBottomSheetOpen(true)}
        isInitializing={isInitializing}
      />

      <TourBottomSheet
        {...currentSlide}
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </>
  );
}

export default withGeoTripParams(TourSwiperContainer);
