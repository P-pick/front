import { LoadingSpinner } from '@/components';
import { withGeoTripParams } from '@/pages/tour/components';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import { TourBottomSheet, TourSwiperView } from '.';
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
  const {
    slideEntries,
    fetchAppend,
    fetchPrepend,
    isFetchingPreviousPage,
    isFetchingNextPage,
  } = useTourSwiperBasedData({
    location,
    radius: distance,
    contentTypeId: tourContentTypeId,
  });
  const {
    swiperRef,
    onSwiper,
    handlePrepend,
    handleAppend,
    initialSlideIndex,
  } = useInfiniteSwiperControl({
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
      {isFetchingPreviousPage && (
        <div className="absolute top-0 left-0 w-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      <TourSwiperView
        handleAppend={handleAppend}
        handlePrepend={handlePrepend}
        handleSlideChange={handleSlideChange}
        onSwiper={onSwiper}
        initialSlideIndex={initialSlideIndex}
        slideEntries={slideEntries}
        openBottomSheet={() => setIsBottomSheetOpen(true)}
      />
      <SideButtonGroup goToAroundTouristButtonProps={currentSlide} />
      <TourBottomSheet
        {...currentSlide}
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
      {isFetchingNextPage && (
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}

export default withGeoTripParams(TourSwiperContainer);
