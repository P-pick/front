import { SkeletonCard } from './components';
import TourListContainer from '@/pages/tour/tourList/components/TourListContainer';
import { Suspense } from 'react';
const fallbackList = [1, 2, 3, 4, 5];

export default function TourList() {
  return (
    <>
      <h1 className="absolute right-1/2 translate-x-1/2 top-5">리스트</h1>
      <div className="mt-15">선택리스트</div>
      <Suspense
        fallback={fallbackList.map(v => (
          <div key={v} className="my-1">
            <SkeletonCard />
          </div>
        ))}
      >
        <TourListContainer />
      </Suspense>
    </>
  );
}
