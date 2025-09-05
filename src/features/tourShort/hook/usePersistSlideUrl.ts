import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface handleSlideChangeProps {
  pageParam: number;
  index: number;
}

export const usePersistSlideUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSlideParams = useCallback(
    ({ index, pageParam }: handleSlideChangeProps) => {
      searchParams.set('slide-index', (index % 10).toString());
      searchParams.set('page-param', pageParam.toString());
      setSearchParams(searchParams);
    },
    [],
  );

  const getSlideIndex = () => {
    const slideIndex = searchParams.get('slide-index');
    if (slideIndex === null) {
      return 0;
    }
    return Number(slideIndex);
  };

  const getPageParam = () => {
    const pageParam = searchParams.get('page-param');
    if (pageParam === null) {
      return 1;
    }
    return Number(pageParam);
  };

  const slideReset = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('slide-index');
    nextParams.delete('page-param');
    setSearchParams(nextParams);
  };

  return {
    setSlideParams,
    getSlideIndex,
    getPageParam,
    slideReset,
  };
};
