import { useSessionStorage } from '@/shared';
import { useCallback } from 'react';

interface SlideState {
  pageParam: number;
  index: number;
}

export const usePersistSlideStorage = () => {
  const [slideState, setSlideState] = useSessionStorage<SlideState>(
    'slideState',
    {
      index: 0,
      pageParam: 1,
    },
  );

  const setSlideParams = useCallback(
    ({ index, pageParam }: SlideState) => {
      setSlideState({ index: index % 10, pageParam });
    },
    [setSlideState],
  );

  const getSlideIndex = () => {
    return slideState.index;
  };

  const getPageParam = () => {
    return slideState.pageParam;
  };

  const slideReset = () => {
    setSlideState({ index: 0, pageParam: 1 });
  };

  return {
    setSlideParams,
    getSlideIndex,
    getPageParam,
    slideReset,
  };
};
