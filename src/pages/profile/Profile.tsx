import { Suspense } from 'react';

import { Seo } from '@/widgets';
import { ProfileContainer } from '@/features/profile';
import { BottomNavigationBar, LoadingSpinner } from '@/shared';

export default function Profile() {
  return (
    <>
      <Seo
        title="내 프로필"
        description="내 프로필 페이지입니다."
        canonicalUrl="https://p-pick.com/profile"
      />
      <section className="flex flex-col h-full w-full">
        <div className="h-full w-full relative">
          <div className="absolute h-full w-full overflow-y-auto overflow-hidden">
            <Suspense fallback={<LoadingSpinner centered={true} />}>
              <ProfileContainer />
            </Suspense>
          </div>
        </div>
        <BottomNavigationBar />
      </section>
    </>
  );
}
