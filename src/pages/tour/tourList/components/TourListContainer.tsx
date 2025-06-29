import { withGeoTripParams } from '@/pages/tour/components';
import { useGeoLocationBasedTourQuery } from '../../service';
import type { GeoTripLocation } from '@/pages/types';
import { InfiniteScroll, SkeletonCard, TourInfoCard } from '.';

import type { AroundContentTypeId } from '@/pages/map/aroundSearch/types';
import { useDeferredValue, useEffect } from 'react';
import { useSyncedState } from '../lib';
interface TourListContainerProps {
  location: GeoTripLocation;
  distance: string;
  tourType: AroundContentTypeId;
}
function TourListContainer({
  location,
  distance,
  tourType,
}: TourListContainerProps) {
  const [localTourType] = useSyncedState(tourType);
  const deferredTourType = useDeferredValue(localTourType);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGeoLocationBasedTourQuery({
      location,
      radius: distance,
      contentTypeId: deferredTourType,
    });
  const tourItems = data.pages.flatMap(page => page.items);
  const isPending = localTourType !== deferredTourType;

  return (
    <>
      <section className="relative">
        {tourItems.map(tourInfo => (
          <TourInfoCard tourInfo={tourInfo} key={tourInfo.contentid} />
        ))}
        {isPending && (
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
