import { withGeoTripParams } from '@/pages/tour/components';
import { useGeoLocationBasedTourQuery } from '../../service';
import type { GeoTripLocation, TourItemWithDetail } from '@/pages/types';
import { InfiniteScroll, SkeletonCard, TourInfoCard } from '.';

import type { AroundContentTypeId } from '@/pages/map/aroundSearch/types';
import { useDeferredValue, useEffect } from 'react';
import { useSyncedState } from '../lib';
import { QueryClient } from '@tanstack/react-query';
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
  const queryClient = new QueryClient();

  const [localTourType] = useSyncedState(tourType);
  const deferredTourType = useDeferredValue(localTourType);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGeoLocationBasedTourQuery({
      location,
      radius: distance,
      contentTypeId: deferredTourType,
    });
  const cacheData = queryClient.getQueryState<TourItemWithDetail[]>([
    'locationBasedData',
    {
      location,
      radius: distance,
      contentTypeId: deferredTourType,
    },
  ]);

  const tourItems = data.pages.flatMap(page => page.items);
  const isPending = localTourType !== deferredTourType || cacheData?.data;

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
