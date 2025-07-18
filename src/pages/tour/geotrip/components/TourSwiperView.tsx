import { Mousewheel, Navigation, Pagination, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import type { SlideEntries } from '../types';
import TourSlide from './TourSlide';

interface TourSwiperViewProps {
  onSwiper: (swiper: SwiperType) => Promise<void>;
  handleSlideChange: (swiper: SwiperType) => void;
  handleAppend: () => Promise<void>;
  handlePrepend: () => Promise<void>;
  slideEntries: SlideEntries[];
  initialSlideIndex: number;
  openBottomSheet: () => void;
}
export default function TourSwiperView({
  handleSlideChange,
  onSwiper,
  handleAppend,
  handlePrepend,
  openBottomSheet,
  initialSlideIndex,
  slideEntries,
}: TourSwiperViewProps) {
  return (
    <Swiper
      direction="vertical"
      watchSlidesProgress
      modules={[Navigation, Pagination, Mousewheel, Virtual]}
      pagination={false}
      mousewheel={{ enabled: true, sensitivity: 1 }}
      className="h-full"
      initialSlide={initialSlideIndex}
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
