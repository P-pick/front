import { useEffect, useState } from 'react';
import { getCurrentLocation } from '@/pages/geotrip/lib';
import { TourSwiperWithLocation } from './';
import type { GeoTripLocation } from '@/pages/types';

export default function GetCurrentGeoLocation() {
  const [location, setLocation] = useState<GeoTripLocation | null>(null);

  useEffect(() => {
    getCurrentLocation().then(setLocation);
  }, []);

  if (!location) {
    return <div>위치 정보를 불러오는 중...</div>;
  }

  return <TourSwiperWithLocation location={location} />;
}
