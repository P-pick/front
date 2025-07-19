import { useQuery } from '@tanstack/react-query';
import destinationQueries from '../../service/queryOptions';
import type { GeoTripLocation } from '@/pages/types';
import { useMemo } from 'react';

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
  const totalCount = useMemo(() => {
    if (requestParams) {
      return (
        requestParams.busCount +
        requestParams.subwayCount +
        requestParams.subwayBusCount
      );
    }
  }, [requestParams]);
  const itineraries = publicFeatures.data?.metaData?.plan.itineraries;
  return (
    <div className="absolute top-23 left-0 z-(--z-layer2) bg-white w-full h-auto">
      <div className="w-full h-8 border-b-1 border-gray-300 flex justify-start items-center">
        <ul className="flex justify-center items-center gap-2 text-xs font-bold">
          <li>전체 {totalCount}</li>
          <li>버스 {requestParams?.busCount}</li>
          <li>지하철 {requestParams?.subwayCount}</li>
          <li>버스+지하철 {requestParams?.subwayBusCount}</li>
        </ul>
      </div>
      <ul>
        {itineraries?.map(({ fare, legs }) => {
          return (
            <div>
              <h3>Fare: {fare.regular.totalFare}</h3>
              <ul>
                {legs.map(leg => {
                  return <>{leg.mode}</>;
                })}
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
