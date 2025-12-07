import SingleTrip from '@/features/tour/ui/single/Single';
import { LoadingSpinner, QueryErrorBoundary } from '@/shared';
import { BottomNavigationBar, Seo } from '@/widgets';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

export default function SingleTripPage() {
  const { contentId } = useParams();
  return (
    <>
      <Seo
        title="관광지 조회"
        description="관광지를 단일 조회하는 페이지입니다."
        canonicalUrl={`https://p-pick.com/tour/${contentId}`}
      />
      <section className="flex flex-col h-full w-full">
        <div className="h-full w-full relative">
          <div className="absolute h-full w-full flex items-center justify-center">
            <QueryErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <SingleTrip />
              </Suspense>
            </QueryErrorBoundary>
          </div>
        </div>
        <BottomNavigationBar />
      </section>
    </>
  );
}
