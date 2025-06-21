import { BackButton, MenuIcon } from '@/components';
import { Outlet } from 'react-router-dom';

export default function Tour() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <div className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)">
          <BackButton />
          <MenuIcon />
        </div>
        <Outlet />
      </div>
    </section>
  );
}
