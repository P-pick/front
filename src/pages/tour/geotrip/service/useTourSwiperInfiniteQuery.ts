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
    if (!hasNextPage && isFetchingNextPage) return;
    return fetchNextPage();
    // if (data) {
    //   const currentPage = data.pageParams.at(-1) as number;
    //   sessionStorage.setItem('currentPage', currentPage.toString());
    // }
  };

  const prepend = () => {
    if (!hasPreviousPage && isFetchingPreviousPage) return;
    return fetchPreviousPage();
    // if (data) {
    //   swiperRef.current.slideTo(data.pages[0]?.items.item.length, 0);
    //   const currentPage = data.pageParams[0] as number;
    //   sessionStorage.setItem('currentPage', currentPage.toString());
    // }
  };

  const flatBasedItems = useMemo(
    () => infiniteData.pages.flatMap(page => page.items.item),
    [infiniteData],
  );

  return {
    slides: flatBasedItems,
    append,
    prepend,
    isFetchingNextPage,
    isFetchingPreviousPage,
  };
};

export default useTourSwiperInfiniteQuery;
