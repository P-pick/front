import { GeoTripInitializer } from './components';
import { Suspense } from 'react';

export default function GeoTrip() {
  return (
    <Suspense fallback={<div>임시로딩</div>}>
      <GeoTripInitializer />
    </Suspense>
  );
}
