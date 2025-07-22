import { Header, LoadingSpinner } from '@/shared';
import { Suspense } from 'react';
import { TourSwiperContainer } from './components';

export default function GeoTrip() {
  return (
    <div className="absolute h-full w-full flex items-center justify-center">
      <Header className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)" />
      <Suspense fallback={<LoadingSpinner />}>
        <TourSwiperContainer />
      </Suspense>
    </div>
  );
}
