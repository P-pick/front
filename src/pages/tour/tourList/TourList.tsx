import { LoadingSpinner } from '@/components';
import TourListContainer from '@/pages/tour/tourList/components/TourListContainer';
import { Suspense } from 'react';

export default function TourList() {
  return (
    <>
      <h1 className="absolute right-1/2 translate-x-1/2 top-5">리스트</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <TourListContainer />
      </Suspense>
    </>
  );
}
