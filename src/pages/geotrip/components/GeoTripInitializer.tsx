import { TourResultSwiper } from './';
import { useSearchParams } from 'react-router-dom';
import useCurrentLocation from '@/lib/useCurrentLocation';

export default function GeoTripInitializer() {
  const [searchParams] = useSearchParams();
  const distance = searchParams.get('distance');
  const tourType = searchParams.get('tour-type');
  const { geoLocation, isLoading } = useCurrentLocation();

  if (isLoading || !geoLocation) return <div>위치 정보를 불러오는 중...</div>;

  if (!distance || !tourType) {
    return (
      <div>필요한 정보가 부족합니다. 거리와 관광지 타입을 확인해주세요.</div>
    );
  }

  return (
    <TourResultSwiper
      location={geoLocation}
      distance={distance}
      tourType={Number(tourType)}
    />
  );
}
