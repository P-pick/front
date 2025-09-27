import { Suspense } from 'react';

import { Seo, BottomNavigationBar, Header } from '@/widgets';
import { ProfileContainer } from '@/features/profile';
import { LoadingSpinner, QueryErrorBoundary } from '@/shared';

export default function Profile() {
  return (
    <>
      <Seo
        title="내 프로필"
        description="내 프로필 페이지입니다."
        canonicalUrl="https://p-pick.com/profile"
      />
      <section className="flex flex-col h-full w-full">
        <Header className="w-full flex items-center justify-between px-3 pt-1">
          <span>내 프로필</span>
        </Header>
        <div className="flex items-center justify-start flex-col h-full">
          <QueryErrorBoundary>
            <Suspense fallback={<LoadingSpinner centered={true} />}>
              <ProfileContainer />
            </Suspense>
          </QueryErrorBoundary>
        </div>
        <BottomNavigationBar />
      </section>
    </>
  );
}
