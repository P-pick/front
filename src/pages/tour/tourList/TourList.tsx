import { Suspense } from 'react';

import { TouristFilterQueryUpdater } from '@/features/tourList';
import { SkeletonCard } from '@/features/tour';
import { TourListContainer } from '@/features/tourList';
import { Header } from '@/widgets';
const fallbackList = [1, 2, 3, 4, 5];

export default function TourList() {
  return (
    <div className="absolute h-full w-full overflow-auto ">
      <Header className="w-full flex items-center justify-between px-5 mt-1.5 mb-6">
        <h1>리스트</h1>
      </Header>
      <TouristFilterQueryUpdater />
      <Suspense
        fallback={fallbackList.map(v => (
          <div key={v} className="my-1">
            <SkeletonCard />
          </div>
        ))}
      >
        <TourListContainer />
      </Suspense>
    </div>
  );
}
