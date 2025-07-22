import Header from '@/shared/Header';
import { Outlet } from 'react-router-dom';

export default function Map() {
  return (
    <section className="w-full h-full flex flex-col">
      <Header className="w-full flex justify-between p-3 items-center">
        <span>지도</span>
      </Header>

      <div className="flex-1">
        <div className="w-full h-full relative">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
