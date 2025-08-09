import { Suspense } from 'react';

import { Header } from '@/widgets';
import { SkeletonCard } from '@/features/tour';
import { FALLBACK_LIST, TourListContainer } from '@/features/tourList';
import { TouristFilterQueryUpdater } from '@/features/tourFilter';
import { SearchNavigate } from '@/features/tourSearch';
import { BottomNavigationBar } from '@/shared';

export default function TourList() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <div className="absolute h-full w-full  overflow-hidden">
          <Header className="w-full flex items-center justify-between px-5 mt-1.5 mb-6">
            <SearchNavigate />
          </Header>
          <TouristFilterQueryUpdater />
          <Suspense
            fallback={FALLBACK_LIST.map(v => (
              <div key={v} className="my-1">
                <SkeletonCard />
              </div>
            ))}
          >
            <TourListContainer />
          </Suspense>
        </div>
      </div>
      <BottomNavigationBar />
    </section>
  );
}
