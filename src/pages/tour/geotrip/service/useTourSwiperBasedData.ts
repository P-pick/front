import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { tourQueries } from '../../service';
import type { LocationBasedInfiniteQueryParams } from '@/pages/tour/types';

const useTourSwiperBasedData = ({
  location,
  radius,
  contentTypeId,
}: LocationBasedInfiniteQueryParams) => {
  const { data: infiniteData, ...rest } = useSuspenseInfiniteQuery(
    tourQueries.locationBasedList({
      location,
      radius,
      contentTypeId,
    }),
  );

  const flatBasedItems = useMemo(
    () => infiniteData.pages.flatMap(page => page.items.item),
    [infiniteData],
  );

  return { slides: flatBasedItems, ...rest, infiniteData };
};

export default useTourSwiperBasedData;
