import type { ResponseBody, TourItem } from '@/pages/types';
import type {
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useRef } from 'react';
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
  prepend: PageFetchQuery;
  append: PageFetchQuery;
}

const useInfiniteSwiperControl = ({
  prepend,
  append,
}: UseInfiniteSwiperControlProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const onSwiper = async (swiper: SwiperType) => {
    swiperRef.current = swiper;

    const currentIndex = Number(sessionStorage.getItem('currentIndex') ?? 0);
    const result = await prepend();
    const prependLength = result?.data?.pages[0]?.items.item.length ?? 0;

    const targetIndex = currentIndex + prependLength;

    const handleSlidesUpdated = () => {
      swiper.slideTo(targetIndex, 0);
      swiper.off('slidesUpdated', handleSlidesUpdated);
    };

    swiper.on('slidesUpdated', handleSlidesUpdated);
  };

  const handleAppend = async () => {
    await append();
  };

  const handlePrepend = async () => {
    const result = await prepend();
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
  };
};

export default useInfiniteSwiperControl;
