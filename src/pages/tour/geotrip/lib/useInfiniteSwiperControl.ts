import type { ResponseBody, TourItem } from '@/pages/types';
import type {
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useRef, useState } from 'react';
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
}

const useInfiniteSwiperControl = ({
  fetchPrepend,
  fetchAppend,
}: UseInfiniteSwiperControlProps) => {
  const [isInitializing, setIsInitializing] = useState(true);

  const swiperRef = useRef<SwiperType | null>(null);
  const onSwiper = async (swiper: SwiperType) => {
    swiperRef.current = swiper;

    const currentIndex = Number(sessionStorage.getItem('currentIndex') ?? 0);
    const result = await fetchPrepend();
    const prependLength = result?.data?.pages[0]?.items.item.length ?? 0;

    const targetIndex = currentIndex + prependLength;

    const handleSlidesUpdated = () => {
      swiper.slideTo(targetIndex, 0);
      swiper.off('slidesUpdated', handleSlidesUpdated);
      setIsInitializing(false);
    };

    swiper.on('slidesUpdated', handleSlidesUpdated);
  };

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
  };
};

export default useInfiniteSwiperControl;
