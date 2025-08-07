import { Suspense, useState } from 'react';

import { Header } from '@/widgets';
import { TourShortFormTutor } from '@/features/tutorial';
import { TourFilterSidebar, useTourFilterQuery } from '@/features/tourFilter';
import { TourSwiperContainer } from '@/features/tourShort';
import { LoadingSpinner, BottomNavigationBar } from '@/shared';

export default function GeoTrip() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { getQuery } = useTourFilterQuery();

  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <div className="absolute h-full w-full flex items-center justify-center">
          <Header
            className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          />
          <TourFilterSidebar
            onClose={() => setSidebarOpen(false)}
            isOpen={isSidebarOpen}
          />
          <Suspense fallback={<LoadingSpinner />}>
            <TourShortFormTutor />
            <TourSwiperContainer key={getQuery()?.tourType} />
          </Suspense>
        </div>
      </div>
      <BottomNavigationBar />
    </section>
  );
}
