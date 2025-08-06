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
  const [isInitializing, setIsInitializing] = useState(true);

  const swiperRef = useRef<SwiperType | null>(null);
  const onSwiper = async (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  const handleSlideTo = useCallback(async () => {
    const currentIndex = getSlideIndex();
    const result = await fetchPrepend();
    const prependLength = result?.data?.pages[0]?.items.item.length ?? 0;

    const targetIndex = currentIndex + prependLength;
    swiperRef.current?.slideTo(targetIndex, 0);
    setIsInitializing(false);
  }, []);

  const handleAppend = async () => {
    await fetchAppend();
  };

  const handlePrepend = async () => {
    const result = await fetchPrepend();
    if (!result) return;
    if (result.data && swiperRef.current) {
      swiperRef.current.slideTo(result.data.pages[0]?.items.item.length, 0);
    }
  };

  return {
    isInitializing,
    swiperRef,
    onSwiper,
    handlePrepend,
    handleAppend,
    handleSlideTo,
  };
};
