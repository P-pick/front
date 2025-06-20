import { withGeoTripParams } from '@/pages/tour/components';
import { useGeoLocationBasedTourQuery } from '../../service';
import type { GeoTripLocation } from '@/pages/types';
import { useMemo } from 'react';
import { SkeletonCard, TourInfoCard } from '.';
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
  const { data, fetchNextPage, hasNextPage } = useGeoLocationBasedTourQuery({
    location,
    radius: distance,
    contentTypeId: tourType,
  });
  const tourItems = useMemo(
    () => data.pages.flatMap(page => page.items),
    [data]
  );

  return (
    <>
      {tourItems.map(tourInfo => (
        <TourInfoCard tourInfo={tourInfo} />
      ))}
      <SkeletonCard />
    </>
  );
}

export default withGeoTripParams(TourListContainer);
