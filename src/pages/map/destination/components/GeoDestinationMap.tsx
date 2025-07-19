import type { GeoTripLocation } from '@/pages/types';
import { useStore } from 'zustand';
import { useTransportation } from '../store';
import withDestination from './withDestination';
import PublicTransit from './publicTransit/PublicTransit';
import { Pedestrian } from './pedestrian';
import { Car } from './car';
import { LoadingSpinner } from '@/components';

interface GeoDestinationMapProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

function GeoDestinationMap({ start, end }: GeoDestinationMapProps) {
  const { vehicle } = useStore(useTransportation);

  if (vehicle === 'pedestrian') {
    return <Pedestrian start={start} end={end} />;
  }

  if (vehicle === 'car') {
    return <Car start={start} end={end} />;
  }

  if (vehicle === 'publictransit') {
    return <PublicTransit start={start} end={end} />;
  }
  return (
    <>
      <LoadingSpinner centered={true} />
    </>
  );
}

export default withDestination(GeoDestinationMap);
