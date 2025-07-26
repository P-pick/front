import type { SlideEntries } from '@/features/tour/types';
import clsx from 'clsx';
import { Mousewheel, Navigation, Pagination, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import { TourSlide } from '../..';

interface TourSwiperViewProps {
  onSwiper: (swiper: SwiperType) => Promise<void>;
  handleSlideChange: (swiper: SwiperType) => void;
  handleAppend: () => Promise<void>;
  handlePrepend: () => Promise<void>;
  slideEntries: SlideEntries[];
  openBottomSheet: () => void;
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
}: TourSwiperViewProps) {
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
    >
      {slideEntries.map(({ slide }, index) => (
        <SwiperSlide
          key={slide.contentid}
          virtualIndex={index}
          id="shortform-slide-tutorial"
        >
          <TourSlide tourInfo={slide} openBottomSheet={openBottomSheet} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
