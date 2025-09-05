import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

import { BottomNavigationBar, Header, Seo } from '@/widgets';
import { BookmarkList } from '@/features/bookmark';
import { authOptions } from '@/entities/auth';
import { LoadingSpinner, QueryErrorBoundary } from '@/shared';

export default function Bookmark() {
  const { data: user } = useSuspenseQuery(authOptions.auth());

  if (!user) {
    return (
      <section className="flex max-w-[375px] flex-col h-full">
        <Header className="w-full flex items-center justify-between px-3 pt-1">
          <span>북마크</span>
        </Header>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="mb-4">로그인이 필요합니다.</p>
        </div>
        <BottomNavigationBar />
      </section>
    );
  }

  return (
    <>
      <Seo
        title="북마크"
        description="북마크 페이지입니다. 즐겨찾는 관광지를 한눈에 확인하고 관리해보세요."
        canonicalUrl="https://p-pick.com/tour/bookmark"
      />
      <section className="flex max-w-[375px] flex-col h-full">
        <Header className="w-full flex items-center justify-between px-3 pt-1">
          <span>북마크</span>
        </Header>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner centered />}>
            <BookmarkList user={user} />
          </Suspense>
        </QueryErrorBoundary>
        <BottomNavigationBar />
      </section>
    </>
  );
}
