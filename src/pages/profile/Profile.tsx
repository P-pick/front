import { ProfileContainer } from '@/features/profile';
import { LoadingSpinner } from '@/shared';
import { BottomNavigationBar } from '@/widgets';
import { Suspense } from 'react';

export default function Profile() {
  return (
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
  );
}
