import { withGeoTripParams } from '@/pages/tour/components';
import { useGeoLocationBasedTourQuery } from '../../service';
import type { GeoTripLocation } from '@/pages/types';
import { InfiniteScroll, SkeletonCard, TourInfoCard } from '.';
interface TourListContainerProps {
  location: GeoTripLocation;
  distance: string;
  tourType: number;
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
        <TourInfoCard tourInfo={tourInfo} />
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
