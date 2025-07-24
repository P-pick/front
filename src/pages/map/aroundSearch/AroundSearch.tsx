import { Suspense } from 'react';

import { useCurrentLocation } from '@/features/map';
import { isValidationLocation } from '@/features/navigate';
import { GeoAroundTouristMap } from '@/features/aroundTourist';
import { LoadingSpinner } from '@/shared';

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
