import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
import { LoadingSpinner } from '@/shared';

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
