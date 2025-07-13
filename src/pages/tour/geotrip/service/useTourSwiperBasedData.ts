import type {
  AroundContentTypeId,
  GeoTripLocation,
  TourItem,
} from '@/pages/types';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { tourQueries } from '../../service';

interface TourSwiperDataProps {
  location: GeoTripLocation;
  distance: string;
  contentTypeId: AroundContentTypeId;
}
interface TourSwiperDataReturn {
  slides: TourItem[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const useTourSwiperBasedData = ({
  location,
  distance,
  contentTypeId,
}: TourSwiperDataProps): TourSwiperDataReturn => {
  const {
    data: basedItems,
    hasNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(
    tourQueries.locationBasedList({
      location,
      radius: distance,
      contentTypeId,
    }),
  );

  const flatBasedItems = useMemo(
    () => basedItems.pages.flatMap(page => page.items.item),
    [basedItems],
  );

  return { slides: flatBasedItems, hasNextPage, fetchNextPage };
};

export default useTourSwiperBasedData;
