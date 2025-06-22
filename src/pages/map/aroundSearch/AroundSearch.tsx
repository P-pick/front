import useCurrentLocation from '@/lib/useCurrentLocation';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components';
import { isValidationLocation } from '../lib';
import GeoAroundTouristMap from './components/GeoAroundTouristMap';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function AroundSearch() {
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
        <GeoAroundTouristMap />
      </Suspense>
    </>
  );
}
