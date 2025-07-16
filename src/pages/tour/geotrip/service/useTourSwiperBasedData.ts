import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { LocationBasedInfiniteQueryParams } from '@/pages/tour/types';
import { useMemo } from 'react';
import { tourQueries } from '../../service';

const useTourSwiperBasedData = ({
  location,
  radius,
  contentTypeId,
  initialPageParam,
}: LocationBasedInfiniteQueryParams) => {
  const { data: infiniteData, ...rest } = useSuspenseInfiniteQuery(
    tourQueries.locationBasedList({
      location,
      radius,
      contentTypeId,
      initialPageParam,
    }),
  );

  const flatBasedItems = useMemo(
    () => infiniteData.pages.flatMap(page => page.items.item),
    [infiniteData],
  );

  return { slides: flatBasedItems, ...rest, infiniteData };
};

export default useTourSwiperBasedData;
