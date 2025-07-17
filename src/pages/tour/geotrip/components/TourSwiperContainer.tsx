import { withGeoTripParams } from '@/pages/tour/components';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { useState } from 'react';
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
  const { slideEntries, fetchAppend, fetchPrepend, isFetchingPreviousPage } =
    useTourSwiperBasedData({
      location,
      radius: distance,
      contentTypeId: tourContentTypeId,
    });
  const { swiperRef, onSwiper, handlePrepend, handleAppend } =
    useInfiniteSwiperControl({
      fetchPrepend,
      fetchAppend,
    });

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const currentSlideEntries = slideEntries[swiperRef.current?.activeIndex ?? 0];
  const currentSlide = currentSlideEntries.slide;
  const handleSlideChange = persistSlideSession(currentSlideEntries);

  return (
    <>
      {isFetchingPreviousPage && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 z-50">
          <div className="text-white">Loading...</div>
        </div>
      )}
      <TourSwiperView
        handleAppend={handleAppend}
        handlePrepend={handlePrepend}
        handleSlideChange={handleSlideChange}
        onSwiper={onSwiper}
        slideEntries={slideEntries}
        openBottomSheet={() => setIsBottomSheetOpen(true)}
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
