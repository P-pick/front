import useCurrentLocation from '@/lib/useCurrentLocation';
import { Suspense, useCallback } from 'react';
import { LoadingSpinner } from '@/components';
import GeoDestinationMap from './GeoDestinationMap';
import type { GeoTripLocation } from '@/pages/types';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

function ChangeLoadingStatusOnMap() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-(--z-layer3) flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

export default function CurrentLocationToDestination() {
  const { geoLocation } = useCurrentLocation();

  const isValidLocation = useCallback(
    (location: GeoTripLocation): location is Required<GeoTripLocation> => {
      return location.lat !== null && location.lng !== null;
    },
    [geoLocation, destination]
  );

  if (!isValidLocation(geoLocation) || !isValidLocation(destination)) {
    return <ChangeLoadingStatusOnMap />;
  }

  return (
    <>
      <Suspense fallback={<ChangeLoadingStatusOnMap />}>
        <GeoDestinationMap start={geoLocation} end={destination} />
      </Suspense>
    </>
  );
}
