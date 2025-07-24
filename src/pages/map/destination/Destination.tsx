import { Suspense } from 'react';

import { GeoDestinationMap } from '@/features/navigate';
import { LoadingSpinner } from '@/shared';

export default function Destination() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner centered={true} />}>
        <GeoDestinationMap />
      </Suspense>
    </>
  );
}
