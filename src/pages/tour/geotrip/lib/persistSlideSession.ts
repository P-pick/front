import type { Swiper as SwiperType } from 'swiper/types';
import type { SlideEntries } from '../types';

const persistSlideSession = (slideEntries: SlideEntries) => {
  const handleSlideChange = (swiper: SwiperType) => {
    sessionStorage.setItem('currentIndex', String(swiper.activeIndex % 10));
    sessionStorage.setItem('currentPage', String(slideEntries.pageParam));
  };

  return handleSlideChange;
};

export default persistSlideSession;
