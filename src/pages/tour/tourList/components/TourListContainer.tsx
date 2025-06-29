import { withGeoTripParams } from '@/pages/tour/components';
import { useGeoLocationBasedTourQuery } from '../../service';
import type { GeoTripLocation } from '@/pages/types';
import { InfiniteScroll, SkeletonCard, TourInfoCard } from '.';

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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGeoLocationBasedTourQuery({
      location,
      radius: distance,
      contentTypeId: tourType,
    });

  const tourItems = data.pages.flatMap(page => page.items);

  return (
    <>
      {tourItems.map(tourInfo => (
        <TourInfoCard tourInfo={tourInfo} key={tourInfo.contentid} />
      ))}
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
        onIntersect={() => {
          console.log('Intersection detected');
          fetchNextPage();
        }}
        LoadingComponent={<SkeletonCard />}
      />
    </>
  );
}

export default withGeoTripParams(TourListContainer);
