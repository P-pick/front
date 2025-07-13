import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import type { TourItemWithDetailImages } from '@/pages/tour/types';
import { useMemo } from 'react';
import { tourQueries } from '../../service';

interface TourSwiperDataProps {
  location: GeoTripLocation;
  distance: string;
  contentTypeId: AroundContentTypeId;
}
interface TourSwiperDataReturn {
  slides: TourItemWithDetailImages[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export function useTourSwiperData({
  location,
  distance,
  contentTypeId,
}: TourSwiperDataProps): TourSwiperDataReturn {
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

  const { data: images } = useSuspenseQuery(
    tourQueries.detailImages(flatBasedItems[0].contentid),
  );

  const slides = flatBasedItems.map(item => {
    return {
      ...item,
      images: images,
    };
  });

  return { slides, hasNextPage, fetchNextPage };
}
