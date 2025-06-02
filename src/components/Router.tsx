import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/home';
import { GeoTrip } from '@/pages/geotrip';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geotrip" element={<GeoTrip />} />
      </Routes>
    </BrowserRouter>
  );
}
