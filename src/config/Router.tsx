import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/home';
import { GeoTrip } from '@/pages/geotrip';
import { GeoMap } from '@/pages/geoMap';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geotrip" element={<GeoTrip />} />
        <Route path="/geoMap" element={<GeoMap />} />
      </Routes>
    </BrowserRouter>
  );
}
