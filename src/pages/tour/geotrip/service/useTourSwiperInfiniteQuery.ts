import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { LocationBasedInfiniteQueryParams } from '@/pages/tour/types';
import { useMemo } from 'react';
import { tourQueries } from '../../service';

const useTourSwiperInfiniteQuery = ({
  location,
  radius,
  contentTypeId,
}: LocationBasedInfiniteQueryParams) => {
  const initialPageParam = Number(sessionStorage.getItem('currentPage') ?? 1);

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

  const fetchAppend = () => {
    if (!hasNextPage || isFetchingNextPage || isFetchingPreviousPage) return;
    return fetchNextPage();
  };

  const fetchPrepend = () => {
    if (!hasPreviousPage || isFetchingPreviousPage || isFetchingNextPage)
      return;
    return fetchPreviousPage();
  };

  const slidesWithPageInfo = useMemo(() => {
    if (!infiniteData) return [];

    return infiniteData.pages.flatMap((page, pageIndex) => {
      const pageParam = infiniteData.pageParams[pageIndex] as number;
      return page.items.item.map(slide => ({
        slide,
        pageParam,
      }));
    });
  }, [infiniteData]);

  return {
    slideEntries: slidesWithPageInfo,
    fetchAppend,
    fetchPrepend,
    isFetchingNextPage,
    isFetchingPreviousPage,
  };
};

export default useTourSwiperInfiniteQuery;
