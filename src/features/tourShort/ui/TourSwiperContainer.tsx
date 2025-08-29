import { useState } from 'react';

import {
  LocationPermissionOverlay,
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
import { getSuspenseLocation } from '@/shared';

import type { Swiper as SwiperType } from 'swiper/types';
interface TourSwiperContainerProps {
  distance: string;
  tourContentTypeId: AroundContentTypeId;
}

function TourSwiperContainer({
  distance,
  tourContentTypeId,
}: TourSwiperContainerProps) {
  const { setSlideParams, getSlideIndex, getPageParam } = usePersistSlideUrl();
  const geoLocation = getSuspenseLocation();

  const { slideEntries, fetchAppend, fetchPrepend } =
    useTourSwiperInfiniteQuery({
      location: geoLocation,
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
      <LocationPermissionOverlay
        description={
          geoLocation.permission === 'retry'
            ? '위치를 불러오지 못했습니다. 위치를 잘 불러올 수 있는 위치에서 다시 시도해 주세요'
            : undefined
        }
        isDenied={geoLocation.permission === 'denied'}
      />
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
