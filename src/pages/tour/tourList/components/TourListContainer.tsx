import { withGeoTripParams } from '@/pages/tour/components';
import { useGeoLocationBasedTourQuery } from '../../service';
import type { GeoTripLocation } from '@/pages/types';
import { InfiniteScroll, SkeletonCard, TourInfoCard } from '.';
import { TouristContentsTypeFilter } from '@/components';
import { useState } from 'react';
import type { AroundContentTypeId } from '@/pages/map/aroundSearch/types';
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
  const [contentTypeId, setContentTypeId] =
    useState<AroundContentTypeId>(tourType);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGeoLocationBasedTourQuery({
      location,
      radius: distance,
      contentTypeId: contentTypeId,
    });

  const tourItems = data.pages.flatMap(page => page.items);

  return (
    <>
      <TouristContentsTypeFilter
        contentTypeId={contentTypeId}
        setContentTypeId={setContentTypeId}
      />
      {tourItems.map(tourInfo => (
        <TourInfoCard tourInfo={tourInfo} key={tourInfo.contentid} />
      ))}
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
        onIntersect={fetchNextPage}
        LoadingComponent={<SkeletonCard />}
      />
    </>
  );
}

export default withGeoTripParams(TourListContainer);
