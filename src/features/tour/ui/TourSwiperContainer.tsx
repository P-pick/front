import type { AroundContentTypeId } from '@/entities/tour';
import { withGeoTripParams } from '@/features/tour/lib';
import type { GeoTripLocation } from '@/shared';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import {
  persistSlideSession,
  TourBottomSheet,
  TourSwiperLoadingOverlay,
  TourSwiperView,
  useInfiniteSwiperControl,
  useTourSwiperInfiniteQuery,
} from '../';
import { SideButtonGroup } from './SideButtonGroup';

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

      <SideButtonGroup goToAroundTouristButtonProps={currentSlide} />
      <TourBottomSheet
        {...currentSlide}
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </>
  );
}

export default withGeoTripParams(TourSwiperContainer);
