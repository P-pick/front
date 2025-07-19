import { useQuery } from '@tanstack/react-query';
import destinationQueries from '../../service/queryOptions';
import type { GeoTripLocation } from '@/pages/types';

interface PublicTransitPolylinesProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function PublicTransitPolylines({
  start,
  end,
}: PublicTransitPolylinesProps) {
  const publicFeatures = useQuery(
    destinationQueries.transit({
      startX: start.lng,
      startY: start.lat,
      endX: end.lng,
      endY: end.lat,
    }),
  );

  const itineraries = publicFeatures.data?.metaData?.plan.itineraries;
  itineraries?.map(({ fare, legs }) => {
    console.log(fare, legs);
  });
}
