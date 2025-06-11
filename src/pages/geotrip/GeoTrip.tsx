import { BackButton, MenuIcon } from '@/components';
import { GeoTripInitializer } from './components';
import { Suspense } from 'react';

export default function GeoTrip() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <div className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)">
          <BackButton />
          <MenuIcon />
        </div>
        <Suspense fallback={<div>임시로딩</div>}>
          <GeoTripInitializer />
        </Suspense>
      </div>
    </section>
  );
}
