import { LoadingSpinner } from '@/shared/ui';
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
