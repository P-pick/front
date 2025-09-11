import { Suspense } from 'react';

import { BottomNavigationBar, Header, Seo } from '@/widgets';
import { SkeletonCard } from '@/features/tour';
import { FALLBACK_LIST, TourListContainer } from '@/features/tourList';
import { TouristFilterQueryUpdater } from '@/features/tourFilter';
import { SearchNavigate } from '@/features/tourSearch';
import { QueryErrorBoundary } from '@/shared';

export default function TourList() {
  return (
    <>
      <Seo
        title="주변 관광지 리스트"
        description="주변 관광지 리스트 페이지입니다. 다양한 관광지를 한눈에 확인하고 관리해보세요."
        canonicalUrl="https://p-pick.com/tour/list"
      />
      <section className="flex flex-col h-full w-full">
        <div className="h-full w-full relative">
          <div className="absolute h-full w-full overflow-hidden">
            <Header className="w-full flex items-center justify-between px-5 mt-1.5 mb-6">
              <SearchNavigate />
            </Header>
            <TouristFilterQueryUpdater />
            <QueryErrorBoundary>
              <Suspense
                fallback={FALLBACK_LIST.map(v => (
                  <div key={v} className="my-1">
                    <SkeletonCard />
                  </div>
                ))}
              >
                <TourListContainer />
              </Suspense>
            </QueryErrorBoundary>
          </div>
        </div>
        <BottomNavigationBar />
      </section>
    </>
  );
}
