import useCurrentLocation from '@/lib/useCurrentLocation';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components';
import GeoDestinationMap from './GeoDestinationMap';
import { isValidationLocation } from '../../lib/utils';

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

  if (
    !isValidationLocation(geoLocation) ||
    !isValidationLocation(destination)
  ) {
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
