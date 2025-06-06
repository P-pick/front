import { TourResultSwiper } from './';
import { getCurrentLocation } from '../lib';
import type { GeoTripLocation } from '../types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function GeoTripInitializer() {
  const [location, setLocation] = useState<GeoTripLocation | null>(null);
  const [searchParams] = useSearchParams();
  const distance = searchParams.get('distance');
  const tourType = searchParams.get('tour-type');

  useEffect(() => {
    getCurrentLocation().then(setLocation);
  }, []);

  if (!location) return <div>위치 정보를 불러오는 중...</div>;

  if (!distance || !tourType) {
    return (
      <div>필요한 정보가 부족합니다. 거리와 투어 타입을 확인해주세요.</div>
    );
  }

  return (
    <TourResultSwiper
      location={location}
      distance={distance}
      tourType={Number(tourType)}
    />
  );
}
