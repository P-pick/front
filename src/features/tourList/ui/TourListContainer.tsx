import {
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { useDeferredValue } from 'react';

import {
  LocationPermissionOverlay,
  SkeletonCard,
  withGeoTripParams,
} from '@/features/tour';
import { TourInfoCard, useShouldShowFallback } from '@/features/tourList';
import { tourQueries } from '@/entities/tour';
import { authOptions } from '@/entities/auth';
import { getSuspenseLocation, InfiniteScroll, useSyncedState } from '@/shared';

import type { AroundContentTypeId } from '@/entities/tour';

interface TourListContainerProps {
  distance: string;
  tourContentTypeId: AroundContentTypeId;
}

function TourListContainer({
  distance,
  tourContentTypeId,
}: TourListContainerProps) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(authOptions.auth());

  const [localTourContentTypeId] = useSyncedState(tourContentTypeId);
  const deferredTourContentTypeId = useDeferredValue(localTourContentTypeId);
  const geoLocation = getSuspenseLocation();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      tourQueries.locationBasedList({
        location: geoLocation,
        radius: distance,
        contentTypeId: deferredTourContentTypeId,
        numOfRows: 4,
      }),
    );

  const shouldShowFallback = useShouldShowFallback({
    location: geoLocation,
    radius: distance,
    localContentTypeId: localTourContentTypeId,
    deferredContentTypeId: deferredTourContentTypeId,
  });
  const tourItems = data.pages.flatMap(page => page.items.item);
  const isDenied = geoLocation.permission === 'denied';

  return (
    <>
      <LocationPermissionOverlay isDenied={isDenied} />
      <section className="relative overflow-y-auto h-full">
        {tourItems.map(tourInfo => (
          <TourInfoCard tourInfo={tourInfo} key={tourInfo.contentid} />
        ))}
        {shouldShowFallback && (
          <div className="absolute inset-0 bg-primary-gray/40 z-10" />
        )}
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetching={isFetchingNextPage}
          onIntersect={fetchNextPage}
          LoadingComponent={<SkeletonCard />}
          triggerClassName="h-50"
        />
      </section>
    </>
  );
}

export default withGeoTripParams(TourListContainer);
