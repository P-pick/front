import { LoadingSpinner } from '@/components';
import { TourResultSwiper } from '@/pages/tour/geotrip/components';
import { Suspense } from 'react';

export default function GeoTrip() {
  return (
    <div className="absolute h-full w-full flex items-center justify-center">
      <Suspense fallback={<LoadingSpinner />}>
        <TourResultSwiper />
      </Suspense>
    </div>
  );
}
