import { LoadingSpinner } from '@/components';
import { TourResultSwiper } from '@/pages/tour/geotrip/components';
import { Suspense } from 'react';

export default function GeoTrip() {
  return (
    <Suspense
      fallback={
        <div className="absolute h-full w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <TourResultSwiper />
    </Suspense>
  );
}
