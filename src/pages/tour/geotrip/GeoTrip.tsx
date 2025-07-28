import { Suspense } from 'react';

import { Header } from '@/widgets';
import { TourSwiperContainer } from '@/features/tour';
import { TourShortFormTutor } from '@/features/tutorial';
import { BottomNavigationBar, LoadingSpinner } from '@/shared';

export default function GeoTrip() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <div className="absolute h-full w-full flex items-center justify-center">
          <Header className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)" />
          <Suspense fallback={<LoadingSpinner />}>
            <TourShortFormTutor />
            <TourSwiperContainer />
          </Suspense>
        </div>
      </div>
      <BottomNavigationBar />
    </section>
  );
}
