import { Suspense } from 'react';
import { LoadingSpinner } from '@/components';
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
