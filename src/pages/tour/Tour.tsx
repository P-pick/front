import Header from '@/components/Header';
import { Outlet, useLocation } from 'react-router-dom';

export default function Tour() {
  const location = useLocation();
  const isGeoTrip = location.pathname === '/tour/geo-trip';

  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <Header>{!isGeoTrip && <h1>리스트</h1>}</Header>
        <Outlet />
      </div>
    </section>
  );
}
