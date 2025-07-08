import { withGeoTripParams } from '@/pages/tour/components';
import { getGeoLocationBasedTourQueryOptions } from '../../service';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { InfiniteScroll, SkeletonCard, TourInfoCard } from '.';
import { useDeferredValue } from 'react';
import { useSyncedState } from '../lib';
import { queryClient } from '@/config/QueryProvider';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
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
    useSuspenseInfiniteQuery(getGeoLocationBasedTourQueryOptions({
      location,
      radius: distance,
      contentTypeId: deferredTourContentTypeId,
    }));

  const queryOptionsForCache = getGeoLocationBasedTourQueryOptions({
      location,
      radius: distance,
      contentTypeId: localTourContentTypeId,
    })

  const cachedData = queryClient.getQueryData(queryOptionsForCache.queryKey);

  const tourItems = data.pages.flatMap(page => page.items);

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
