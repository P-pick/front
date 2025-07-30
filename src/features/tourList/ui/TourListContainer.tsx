import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';

import { tourQueries } from '@/entities/tour';
import { SkeletonCard, withGeoTripParams } from '@/features/tour';
import { TourInfoCard, useShouldShowFallback } from '@/features/tourList';
import { InfiniteScroll, useSyncedState } from '@/shared';

import { type AroundContentTypeId } from '@/entities/tour';
import { type GeoTripLocation } from '@/shared';
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
        numOfRows: 4,
      }),
    );
  const shouldShowFallback = useShouldShowFallback({
    location,
    radius: distance,
    localContentTypeId: localTourContentTypeId,
    deferredContentTypeId: deferredTourContentTypeId,
  });
  const tourItems = data.pages.flatMap(page => page.items.item);

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
        onIntersect={fetchNextPage}
        LoadingComponent={<SkeletonCard />}
        triggerClassName="h-50"
      />
    </>
  );
}

export default withGeoTripParams(TourListContainer);
