import { BackButton, MenuIcon } from '@/components';
import { Outlet } from 'react-router-dom';

export default function Map() {
  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full flex justify-between p-3 items-center">
        <BackButton />
        <span>지도</span>
        <MenuIcon />
      </div>
      <div className="flex-1">
        <div className="w-full h-full relative">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
