import { useState } from 'react';

import {
  TourBottomSheet,
  TourSwiperLoadingOverlay,
  withGeoTripParams,
} from '@/features/tour';
import {
  TourSwiperView,
  useTourSwiperInfiniteQuery,
  useInfiniteSwiperControl,
  usePersistSlideUrl,
} from '@/features/tourShort';
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
  const { setSlideParams, getSlideIndex, getPageParam } = usePersistSlideUrl();

  const { slideEntries, fetchAppend, fetchPrepend } =
    useTourSwiperInfiniteQuery({
      location,
      radius: distance,
      contentTypeId: tourContentTypeId,
      initialPageParam: getPageParam(),
    });

  const {
    swiperRef,
    onSwiper,
    handlePrepend,
    handleAppend,
    isSliding,
    initSlideTo,
  } = useInfiniteSwiperControl({
    fetchPrepend,
    fetchAppend,
    getSlideIndex,
  });

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const currentSlide = slideEntries[swiperRef.current?.activeIndex ?? 0].slide;

  const handleSlideChange = (swiper: SwiperType) => {
    if (isSliding) return;
    const index = swiper.activeIndex;
    setSlideParams({
      index,
      pageParam: slideEntries[index].pageParam,
    });
  };

  return (
    <div className="relative w-full h-full">
      <TourSwiperLoadingOverlay isInitializing={isSliding} />
      <TourSwiperView
        handleAppend={handleAppend}
        handlePrepend={handlePrepend}
        handleSlideChange={handleSlideChange}
        initSlideTo={initSlideTo}
        onSwiper={onSwiper}
        slideEntries={slideEntries}
        openBottomSheet={() => setIsBottomSheetOpen(true)}
        isSliding={isSliding}
      />

      <TourBottomSheet
        {...currentSlide}
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </div>
  );
}

export default withGeoTripParams(TourSwiperContainer);
