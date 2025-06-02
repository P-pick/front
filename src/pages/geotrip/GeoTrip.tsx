import api from '@/config/instance';
import BackButton from './ui/BackButton';
import { useEffect, useState } from 'react';
import useGeolocation from './lib/useGeolocation';
import type { ApiResponse, Item, Location } from './types';

export default function GeoTrip() {
  const [data, setData] = useState<Item[]>([]);
  const { location, isLoading, error } = useGeolocation({
    enableHighAccuracy: true,
  });

  useEffect(() => {
    async function fetchData({ longitude, latitude }: Location) {
      try {
        const res = await api.get<ApiResponse>(`/locationBasedList2`, {
          params: {
            mapX: longitude,
            mapY: latitude,
            radius: '1000',
          },
        });
        console.log(res);
        setData(res.data.response.body.items.item);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    }

    location &&
      fetchData({ longitude: location.longitude, latitude: location.latitude });
  }, [location]);

  if (isLoading) return <p>위치 정보를 가져오는 중...</p>;
  if (error) return <p>위치 정보 오류: {error}</p>;
  if (data.length === 0) return <p>데이터가 없습니다.</p>;

  return (
    <div className="flex flex-col h-full">
      <BackButton />
      <div className="h-full w-full">
        <img
          className="object-cover w-full h-full absolute z-5"
          src={data[0].firstimage}
        />
      </div>
      {data[0].title}
    </div>
  );
}
