import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import type { TourSummary } from '../types';

const useCurrentSlideInfo = (
  slides: {
    slide: TourSummary;
    pageParam: unknown;
  }[],
) => {
  const [currentSlide, setCurrentSlide] = useState<TourSummary>(
    () => slides[0].slide,
  );

  const handleSlideChange = (swiper: SwiperType) => {
    const current = slides[swiper.activeIndex];
    if (current) {
      setCurrentSlide(current.slide);
      sessionStorage.setItem('currentIndex', String(swiper.activeIndex % 10));
      sessionStorage.setItem('currentPage', String(current.pageParam));
    }
  };

  return { currentSlide, handleSlideChange };
};

export default useCurrentSlideInfo;
