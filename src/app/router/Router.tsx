import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import {
  Map,
  Destination,
  AroundSearch,
  TourList,
  TourSearch,
} from '@/app/router';
import { Home } from '@/pages/home';
import { GeoTrip } from '@/pages/tour/geotrip';
import { GeoSetup } from '@/pages/geoSetup';
import { Tour } from '@/pages/tour';
import { Profile } from '@/pages/profile';

import { LoadingSpinner } from '@/shared';
import TourDetail from '@/pages/tour/tourDetail/tourDetail';

export default function Router() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | undefined;
  const bg = state?.backgroundLocation ?? location;

  return (
    <>
      <Suspense fallback={<LoadingSpinner centered />}>
        <Routes location={bg}>
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
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/tour/:id" element={<TourDetail />} />
          </Routes>
        )}
      </Suspense>
    </>
  );
}
