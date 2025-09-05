import { Suspense, useState } from 'react';

import { Header, Seo } from '@/widgets';
import { TourShortFormTutor } from '@/features/tutorial';
import { TourFilterSidebar, useTourFilterQuery } from '@/features/tourFilter';
import { TourSwiperContainer } from '@/features/tourShort';
import {
  LoadingSpinner,
  BottomNavigationBar,
  QueryErrorBoundary,
} from '@/shared';

export default function GeoTrip() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { getQuery } = useTourFilterQuery();

  return (
    <>
      <Seo
        title="주변 관광지 숏폼"
        description="주변 관광지 숏폼 페이지입니다. 다양한 관광지를 한눈에 확인하고 관리해보세요."
        canonicalUrl="https://p-pick.com/tour/geotrip"
      />
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
            <QueryErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <TourShortFormTutor />
                <TourSwiperContainer key={getQuery()?.tourType} />
              </Suspense>
            </QueryErrorBoundary>
          </div>
        </div>
        <BottomNavigationBar />
      </section>
    </>
  );
}
