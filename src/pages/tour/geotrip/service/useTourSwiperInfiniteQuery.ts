import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { LocationBasedInfiniteQueryParams } from '@/pages/tour/types';
import { useMemo } from 'react';
import { tourQueries } from '../../service';

const useTourSwiperInfiniteQuery = ({
  location,
  radius,
  contentTypeId,
  initialPageParam,
}: LocationBasedInfiniteQueryParams) => {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useSuspenseInfiniteQuery(
    tourQueries.locationBasedList({
      location,
      radius,
      contentTypeId,
      initialPageParam,
    }),
  );

  const append = () => {
    if (!hasNextPage || isFetchingNextPage || isFetchingPreviousPage) return;
    return fetchNextPage();
  };

  const prepend = () => {
    if (!hasPreviousPage || isFetchingPreviousPage || isFetchingNextPage)
      return;
    return fetchPreviousPage();
  };

  const slidesWithPageInfo = useMemo(() => {
    if (!infiniteData) return [];

    return infiniteData.pages.flatMap((page, pageIndex) => {
      const pageParam = infiniteData.pageParams[pageIndex];
      return page.items.item.map(slide => ({
        slide,
        pageParam,
      }));
    });
  }, [infiniteData]);

  return {
    slides: slidesWithPageInfo,
    append,
    prepend,
    isFetchingNextPage,
    isFetchingPreviousPage,
  };
};

export default useTourSwiperInfiniteQuery;
