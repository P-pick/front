import api from '@/config/instance';
import BackButton from './ui/BackButton';
import { useEffect, useState } from 'react';
import useGeolocation from './lib/useGeolocation';

export default function GeoTrip() {
  const [data, setData] = useState(null);
  const { location, isLoading, error } = useGeolocation({
    enableHighAccuracy: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/locationBasedList2`, {
          params: {
            mapX: location.longitude,
            mapY: location.latitude,
            radius: '100m',
          },
        });
        setData(res.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    }

    fetchData();
  }, [location]);

  if (isLoading) return <p>위치 정보를 가져오는 중...</p>;
  if (error) return <p>위치 정보 오류: {error}</p>;

  console.log(data);

  return (
    <>
      <BackButton />
    </>
  );
}
