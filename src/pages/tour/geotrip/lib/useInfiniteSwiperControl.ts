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
  const saveSwiperIndexToSession = (swiper: SwiperType) => {
    sessionStorage.setItem(
      'currentIndex',
      ((swiper.activeIndex + 1) % 10).toString(),
    );
  };
  const onSwiper = async (swiper: SwiperType) => {
    swiperRef.current = swiper;
    const result = await prepend();
    if (result && result.data) {
      swiperRef.current.slideTo(result.data.pages[0]?.items.item.length, 0);
      const initPage = result.data.pageParams[0] as number;
      sessionStorage.setItem('currentPage', initPage.toString());
      saveSwiperIndexToSession(swiper);
    }
  };
  const handleAppend = async () => {
    const result = await append();
    if (result && result.data) {
      const currentPage = result.data.pageParams.at(-1) as number;
      sessionStorage.setItem('currentPage', currentPage.toString());
    }
  };
  const handlePrepend = async () => {
    const result = await prepend();
    if (result && result.data && swiperRef.current) {
      swiperRef.current.slideTo(result.data.pages[0]?.items.item.length, 0);
      const currentPage = result.data.pageParams[0] as number;
      sessionStorage.setItem('currentPage', currentPage.toString());
    }
  };

  return {
    swiperRef,
    onSwiper,
    saveSwiperIndexToSession,
    handlePrepend,
    handleAppend,
  };
};

export default useInfiniteSwiperControl;
