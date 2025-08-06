import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, Pagination, Virtual } from 'swiper/modules';
import clsx from 'clsx';

import { TourSlide } from '@/features/tourShort';

import type { Swiper as SwiperType } from 'swiper/types';
import type { SlideEntries } from '@/features/tour/types';
import { useLayoutEffect } from 'react';

interface TourSwiperViewProps {
  onSwiper: (swiper: SwiperType) => Promise<void>;
  handleSlideChange: (swiper: SwiperType) => void;
  handleAppend: () => Promise<void>;
  handlePrepend: () => Promise<void>;
  slideEntries: SlideEntries[];
  openBottomSheet: () => void;
  handleSlideTo: () => Promise<void>;
  isInitializing: boolean;
}

export default function TourSwiperView({
  handleSlideChange,
  onSwiper,
  handleAppend,
  handlePrepend,
  openBottomSheet,
  slideEntries,
  isInitializing,
  handleSlideTo,
}: TourSwiperViewProps) {
  useLayoutEffect(() => {
    handleSlideTo();
  }, []);

  const className = clsx(
    isInitializing
      ? 'opacity-0 pointer-events-none'
      : 'h-full transition-opacity duration-300',
  );

  return (
    <Swiper
      direction="vertical"
      watchSlidesProgress
      modules={[Navigation, Pagination, Mousewheel, Virtual]}
      pagination={false}
      mousewheel={{ enabled: true, sensitivity: 1 }}
      className={className}
      onSwiper={onSwiper}
      onSlideChange={handleSlideChange}
      onReachEnd={handleAppend}
      onReachBeginning={handlePrepend}
      virtual
    >
      {slideEntries.map(({ slide }, index) => (
        <SwiperSlide key={slide.contentid} virtualIndex={index}>
          <TourSlide tourInfo={slide} openBottomSheet={openBottomSheet} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
