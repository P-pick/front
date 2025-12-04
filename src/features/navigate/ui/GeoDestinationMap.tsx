import { useStore } from 'zustand';

import {
  handleRedirectTransportation,
  useTransportationStore,
  withDestination,
} from '@/features/navigate';
import { LoadingSpinner } from '@/shared';

import type { GeoTripLocation } from '@/shared';
import { lazy } from 'react';

interface GeoDestinationMapProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

const Pedestrian = lazy(() => import('@/features/pedestrian/ui/Pedestrian'));
const Car = lazy(() => import('@/features/car/ui/Car'));
const PublicTransit = lazy(
  () => import('@/features/publicTransit/ui/PublicTransit'),
);

function GeoDestinationMap({ start, end }: GeoDestinationMapProps) {
  const { vehicle } = useStore(useTransportationStore);

  if (vehicle === 'pedestrian') {
    return <Pedestrian start={start} end={end} />;
  }

  if (vehicle === 'car') {
    return <Car start={start} end={end} />;
  }

  if (vehicle === 'publictransit') {
    return <PublicTransit start={start} end={end} />;
  }

  if (vehicle === 'bicycle') {
    return (
      <div
        className="absolute left-0 top-24 z-(--z-layer2) cursor-pointer text-center text-sm text-gray-500 hover:text-gray-700"
        onClick={() => handleRedirectTransportation({ start, end, vehicle })}
      >
        개발중... [카카오 지도로 이동하기]
      </div>
    );
  }

  return (
    <>
      <LoadingSpinner centered={true} />
    </>
  );
}

export default withDestination(GeoDestinationMap);
