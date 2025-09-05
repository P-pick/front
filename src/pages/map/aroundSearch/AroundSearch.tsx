import { Suspense } from 'react';

import { Seo } from '@/widgets';
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
      <Seo
        title="주변 탐색"
        description="현재 위치를 기반으로 주변의 인기 관광지를 지도로 한눈에 확인해보세요. P-PICK이 추천하는 새로운 장소를 발견할 수 있습니다."
        canonicalUrl="https://p-pick.com/map/around-search"
      />
      <QueryErrorBoundary>
        <Suspense fallback={<LoadingSpinner centered={true} />}>
          <GeoAroundTouristMap />
        </Suspense>
      </QueryErrorBoundary>
    </>
  );
}
