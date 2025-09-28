import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

import { BottomNavigationBar, Header, Seo } from '@/widgets';
import { BookmarkList } from '@/features/bookmark';
import { authOptions } from '@/entities/auth';
import { QueryErrorBoundary } from '@/shared';
import { Link } from 'react-router-dom';
import { FALLBACK_LIST } from '@/features/tourList';
import { SkeletonCard } from '@/features/tour';

export default function Bookmark() {
  const { data: user } = useSuspenseQuery(authOptions.auth());

  if (!user) {
    return (
      <>
        <Seo
          title="북마크"
          description="북마크 페이지입니다. 즐겨찾는 관광지를 한눈에 확인하고 관리해보세요."
          canonicalUrl="https://p-pick.com/tour/bookmark"
        />
        <section className="flex flex-col h-full w-full">
          <Header className="w-full flex items-center justify-between px-3 pt-1">
            <span>북마크</span>
          </Header>
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-4">로그인이 필요한 기능입니다.</p>
            <Link to="/profile?distance=20000&tour-type=12">
              <button className="py-2 px-5 bg-(--color-primary-red) text-white rounded">
                로그인 하러 가기
              </button>
            </Link>
          </div>
          <BottomNavigationBar />
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title="북마크"
        description="북마크 페이지입니다. 즐겨찾는 관광지를 한눈에 확인하고 관리해보세요."
        canonicalUrl="https://p-pick.com/tour/bookmark"
      />
      <section className="flex flex-col h-full w-full">
        <div className="h-full w-full relative">
          <div className="absolute h-full w-full overflow-hidden">
            <Header className="w-full flex items-center justify-between px-5 mt-1.5 mb-6">
              북마크
            </Header>
            <QueryErrorBoundary>
              <Suspense
                fallback={FALLBACK_LIST.map(v => (
                  <div key={v} className="my-1">
                    <SkeletonCard />
                  </div>
                ))}
              >
                <BookmarkList user={user} />
              </Suspense>
            </QueryErrorBoundary>
          </div>
        </div>
        <BottomNavigationBar />
      </section>
    </>
  );
}
