import { withGeoTripParams } from '@/pages/tour/components';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import {
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { InfiniteScroll, SkeletonCard, TourInfoCard } from '.';
import { tourQueries } from '../../service';
import { useSyncedState } from '../lib';
interface TourListContainerProps {
  location: GeoTripLocation;
  distance: string;
  tourContentTypeId: AroundContentTypeId;
}

function TourListContainer({
  location,
  distance,
  tourContentTypeId,
}: TourListContainerProps) {
  const [localTourContentTypeId] = useSyncedState(tourContentTypeId);
  const deferredTourContentTypeId = useDeferredValue(localTourContentTypeId);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      tourQueries.locationBasedList({
        location,
        radius: distance,
        contentTypeId: deferredTourContentTypeId,
      }),
    );

  const queryOptionsForCache = tourQueries.locationBasedList({
    location,
    radius: distance,
    contentTypeId: localTourContentTypeId,
  });
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(queryOptionsForCache.queryKey);

  const tourItems = data.pages.flatMap(page => page.items.item);

  const hasCache = Boolean(cachedData);
  const isSwitching = localTourContentTypeId !== deferredTourContentTypeId;
  const shouldShowFallback = isSwitching && !hasCache;

  return (
    <>
      <section className="relative">
        {tourItems.map(tourInfo => (
          <TourInfoCard tourInfo={tourInfo} key={tourInfo.contentid} />
        ))}
        {shouldShowFallback && (
          <div className="absolute inset-0 bg-primary-gray/40 z-10" />
        )}
      </section>
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
        onIntersect={() => {
          fetchNextPage();
        }}
        LoadingComponent={<SkeletonCard />}
      />
    </>
  );
}

export default withGeoTripParams(TourListContainer);
