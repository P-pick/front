import BottomNavigationBar from '@/components/bottomNavigationBar';
import { Outlet } from 'react-router-dom';

export default function Tour() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <Outlet />
      </div>
      <BottomNavigationBar />
    </section>
  );
}
