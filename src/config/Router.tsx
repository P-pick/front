import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/home';
import { GeoTrip } from '@/pages/tour/geotrip';
import { GeoMap } from '@/pages/geoMap';
import { GeoSetup } from '@/pages/geoSetup';
import { TourList } from '@/pages/tour/tourList';
import { Tour } from '@/pages/tour';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geo-setup" element={<GeoSetup />} />
        <Route path="/geo-map" element={<GeoMap />} />
        <Route path="/tour" element={<Tour />}>
          <Route path="geo-trip" element={<GeoTrip />} />
          <Route path="list" element={<TourList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
