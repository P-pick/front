import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/home';
import { GeoMap } from '@/pages/geoMap';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geoMap" element={<GeoMap />} />
      </Routes>
    </BrowserRouter>
  );
}
