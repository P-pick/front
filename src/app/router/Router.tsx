import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Map,
  Destination,
  AroundSearch,
  TourList,
  TourSearch,
  TourShare,
} from '@/app/router';
import { Home } from '@/pages/home';
import { GeoTrip } from '@/pages/tour/geotrip';
import { Bookmark } from '@/pages/tour/bookmark';
import { Tour } from '@/pages/tour';
import { Profile } from '@/pages/profile';

import { LoadingSpinner } from '@/shared';

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner centered />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />}>
            <Route path="destination" element={<Destination />} />
            <Route path="around-search" element={<AroundSearch />} />
          </Route>
          <Route path="/tour" element={<Tour />}>
            <Route path="geo" element={<GeoTrip />} />
            <Route path="share/:contentId" element={<TourShare />} />
            <Route path="list" element={<TourList />} />
            <Route path="search" element={<TourSearch />} />
            <Route path="bookmark" element={<Bookmark />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
