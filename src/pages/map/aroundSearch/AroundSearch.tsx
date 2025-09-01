import { Suspense } from 'react';

import { isValidationLocation } from '@/features/navigate';
import { GeoAroundTouristMap } from '@/features/aroundTourist';
import {
  getSuspenseLocation,
  LoadingSpinner,
  QueryErrorBoundary,
} from '@/shared';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function AroundSearch() {
  const geoLocation = getSuspenseLocation();

  if (
    !isValidationLocation(geoLocation) ||
    !isValidationLocation(destination)
  ) {
    return <LoadingSpinner centered={true} />;
  }

  return (
    <>
      <QueryErrorBoundary>
        <Suspense fallback={<LoadingSpinner centered={true} />}>
          <GeoAroundTouristMap />
        </Suspense>
      </QueryErrorBoundary>
    </>
  );
}
