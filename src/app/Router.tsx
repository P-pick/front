import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/home';
import { GeoTrip } from '@/pages/tour/geotrip';
import { GeoSetup } from '@/pages/geoSetup';
import { TourList } from '@/pages/tour/tourList';
import { Tour } from '@/pages/tour';
import { Map } from '@/pages/map';
import { Destination } from '@/pages/map/destination';
import { AroundSearch } from '@/pages/map/aroundSearch';
import { TourSearch } from '@/pages/tour/search';

export default function Router() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
