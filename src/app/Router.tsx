import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '@/pages/home';
import { GeoTrip } from '@/pages/tour/geotrip';
import { GeoSetup } from '@/pages/geoSetup';
import { Tour } from '@/pages/tour';
import { LoadingSpinner } from '@/shared';

const Map = lazy(() => import('@/pages/map/Map'));
const Destination = lazy(() => import('@/pages/map/destination/Destination'));
const AroundSearch = lazy(
  () => import('@/pages/map/aroundSearch/AroundSearch'),
);
const TourList = lazy(() => import('@/pages/tour/tourList/TourList'));
const TourSearch = lazy(() => import('@/pages/tour/search/TourSearch'));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner centered />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/geo-setup" element={<GeoSetup />} />
          <Route path="/map" element={<Map />}>
            <Route path="destination" element={<Destination />} />
            <Route path="around-search" element={<AroundSearch />} />
          </Route>
          <Route path="/tour" element={<Tour />}>
            <Route path="geo-trip" element={<GeoTrip />} />
            <Route path="list" element={<TourList />} />
            <Route path="search" element={<TourSearch />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
