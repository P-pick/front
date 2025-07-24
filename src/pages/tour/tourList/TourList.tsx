import { Suspense } from 'react';

import { SkeletonCard } from '@/features/tour';
import {
  SearchForm,
  TouristFilterQueryUpdater,
  TourListContainer,
} from '@/features/tourList';
import { Header } from '@/widgets';
const fallbackList = [1, 2, 3, 4, 5];

export default function TourList() {
  return (
    <div className="absolute h-full w-full overflow-auto ">
      <Header className="w-full flex items-center justify-between px-5 mt-1.5 mb-6">
        <SearchForm />
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
