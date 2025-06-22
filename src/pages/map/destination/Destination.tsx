import useCurrentLocation from '@/lib/useCurrentLocation';
import { Suspense } from 'react';
import { isValidationLocation } from '../lib';
import { GeoDestinationMap } from './components';
import { LoadingSpinner } from '@/components';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function Destination() {
  const { geoLocation } = useCurrentLocation();

  if (
    !isValidationLocation(geoLocation) ||
    !isValidationLocation(destination)
  ) {
    return <LoadingSpinner centered={true} />;
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner centered={true} />}>
        <GeoDestinationMap start={geoLocation} end={destination} />
      </Suspense>
    </>
  );
}
