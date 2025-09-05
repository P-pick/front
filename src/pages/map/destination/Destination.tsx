import { Suspense } from 'react';

import { Seo } from '@/widgets';
import { GeoDestinationMap } from '@/features/navigate';
import { LoadingSpinner, QueryErrorBoundary } from '@/shared';

export default function Destination() {
  return (
    <>
      <Seo
        title="목적지 설정"
        description="여행할 목적지를 설정하고, 길찾기 기능을 통해 최적의 경로를 안내받아보세요. P-PICK이 여행을 더욱 편리하게 만들어드립니다."
        canonicalUrl="https://p-pick.com/map/destination"
      />
      <QueryErrorBoundary>
        <Suspense fallback={<LoadingSpinner centered={true} />}>
          <GeoDestinationMap />
        </Suspense>
      </QueryErrorBoundary>
    </>
  );
}
