import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/home';
import { GeoTrip } from '@/pages/geotrip';
import { GeoMap } from '@/pages/geoMap';
import { GeoSetup } from '@/pages/geoSetup';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geo-setup" element={<GeoSetup />} />
        <Route path="/geo-trip" element={<GeoTrip />} />
        <Route path="/geo-map" element={<GeoMap />} />
      </Routes>
    </BrowserRouter>
  );
}
