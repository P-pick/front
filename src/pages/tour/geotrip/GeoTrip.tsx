import { TourShortFormTutor } from '@/features/tutorial';
import { Header, LoadingSpinner } from '@/shared';
import { TourSwiperContainer } from '@/widgets';
import { Suspense } from 'react';

export default function GeoTrip() {
  return (
    <div className="absolute h-full w-full flex items-center justify-center">
      <Header className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)" />
      <Suspense fallback={<LoadingSpinner />}>
        <TourShortFormTutor />
        <TourSwiperContainer />
      </Suspense>
    </div>
  );
}
