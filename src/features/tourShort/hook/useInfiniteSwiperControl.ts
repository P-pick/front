import type { ResponseBody, TourItem } from '@/pages/types';
import type {
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';

type PageFetchQuery = () =>
  | Promise<
      InfiniteQueryObserverResult<
        InfiniteData<ResponseBody<TourItem[]>, unknown>,
        Error
      >
    >
  | undefined;

interface UseInfiniteSwiperControlProps {
  fetchPrepend: PageFetchQuery;
  fetchAppend: PageFetchQuery;
  getSlideIndex: () => number;
}

export const useInfiniteSwiperControl = ({
  fetchPrepend,
  fetchAppend,
  getSlideIndex,
}: UseInfiniteSwiperControlProps) => {
  const [isSliding, setIsSliding] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const onSwiper = async (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  const initSlideTo = useCallback(async () => {
    const currentIndex = getSlideIndex();
    setIsSliding(true);
    swiperRef.current?.slideTo(currentIndex, 0);
    setIsSliding(false);
  }, []);

  const handleAppend = async () => {
    await fetchAppend();
  };

  const handlePrepend = async () => {
    const result = await fetchPrepend();
    if (!result?.data || !swiperRef.current) return;

    const prependLength = result.data.pages[0]?.items.item.length ?? 0;

    const onSlidesUpdated = (swiper: SwiperType) => {
      swiper.slideTo(prependLength, 0);
      swiper.off('slidesUpdated', onSlidesUpdated);
      setIsSliding(false);
    };
    setIsSliding(true);
    swiperRef.current.on('slidesUpdated', onSlidesUpdated);
  };

  return {
    isSliding,
    swiperRef,
    onSwiper,
    handlePrepend,
    handleAppend,
    initSlideTo,
  };
};
