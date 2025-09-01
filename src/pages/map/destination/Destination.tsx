import { Suspense } from 'react';

import { GeoDestinationMap } from '@/features/navigate';
import { LoadingSpinner, QueryErrorBoundary } from '@/shared';

export default function Destination() {
  return (
    <>
      <QueryErrorBoundary>
        <Suspense fallback={<LoadingSpinner centered={true} />}>
          <GeoDestinationMap />
        </Suspense>
      </QueryErrorBoundary>
    </>
  );
}
