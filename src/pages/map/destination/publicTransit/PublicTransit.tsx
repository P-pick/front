import { useQuery } from '@tanstack/react-query';
import type { GeoTripLocation } from '@/pages/types';
import destinationQueries from '../service/queryOptions';
import TransitCountList from './TransitCountList';
import Itineraries from './Itineraries';

interface PublicTransitProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function PublicTransit({ start, end }: PublicTransitProps) {
  const publicFeatures = useQuery(
    destinationQueries.transit({
      startX: start.lng,
      startY: start.lat,
      endX: end.lng,
      endY: end.lat,
    }),
  );

  const requestParams = publicFeatures.data?.metaData?.requestParameters;
  const itineraries = publicFeatures.data?.metaData?.plan.itineraries;

  return (
    <div className="absolute bg-white w-full h-[80%]">
      {requestParams && <TransitCountList requestParams={requestParams} />}
      {itineraries && <Itineraries itineraries={itineraries} />}
    </div>
  );
}
