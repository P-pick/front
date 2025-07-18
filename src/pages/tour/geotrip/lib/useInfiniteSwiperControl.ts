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
  const swiperRef = useRef<SwiperType | null>(null);
  const [initialSlideIndex, setInitialSlideIndex] = useState(
    Number(sessionStorage.getItem('currentIndex') ?? 0),
  );

  const onSwiper = async (swiper: SwiperType) => {
    swiperRef.current = swiper;

    const currentIndex = initialSlideIndex;

    if (currentIndex > 0) {
      const result = await fetchPrepend();
      const prependLength = result?.data?.pages[0]?.items.item.length ?? 0;
      setInitialSlideIndex(currentIndex + prependLength);
    } else {
      setInitialSlideIndex(0);
    }
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
    swiperRef,
    onSwiper,
    handlePrepend,
    handleAppend,
    initialSlideIndex,
  };
};

export default useInfiniteSwiperControl;
