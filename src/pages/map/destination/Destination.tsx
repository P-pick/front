import { LoadingSpinner } from '@/shared';
import { Suspense } from 'react';
import { GeoDestinationMap } from './components';

export default function Destination() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner centered={true} />}>
        <GeoDestinationMap />
      </Suspense>
    </>
  );
}
