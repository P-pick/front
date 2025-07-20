import { withGeoTripParams } from '@/pages/tour/components';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import { TourBottomSheet, TourSwiperLoadingOverlay, TourSwiperView } from '.';
import { persistSlideSession, useInfiniteSwiperControl } from '../lib';
import { useTourSwiperBasedData } from '../service';
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
    useTourSwiperBasedData({
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
