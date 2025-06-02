import api from '@/config/instance';
import { BackButton, DistanceTimeInfo, TransportList, MenuIcon } from './ui';
import { useEffect, useState } from 'react';
import useGeolocation from './lib/useGeolocation';
import type { ApiResponse, Item, Location, TransportMode } from './types';
import { useSwipe } from '@/pages/geotrip/lib/useSwipe';

export default function GeoTrip() {
  const [data, setData] = useState<Item[]>([]);
  const [transportMode, setTransportMode] = useState<TransportMode>('walk');
  const { location, isLoading, error } = useGeolocation({
    enableHighAccuracy: true,
  });
  const ref = useSwipe<HTMLDivElement>({ up: () => console.log('up') });
  useEffect(() => {
    async function fetchData({ longitude, latitude }: Location) {
      try {
        const res = await api.get<ApiResponse>(`/locationBasedList2`, {
          params: {
            mapX: longitude,
            mapY: latitude,
            radius: '5000',
            contentTypeId: 12,
          },
        });

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
    <div className="flex flex-col h-full" ref={ref}>
      <div className="h-full w-full relative">
        <div className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-button)">
          <BackButton />
          <ul className="flex gap-[6px]">
            <li className="rounded-full bg-[#0084FF] w-2 h-2" />
            <li className="rounded-full bg-[#D9D9D9] w-2 h-2" />
            <li className="rounded-full bg-[#D9D9D9] w-2 h-2" />
          </ul>
          <MenuIcon />
        </div>
        <div className="absolute bottom-0 left-5 text-white">
          <h1 className="text-2xl font-bold">{data[0].title}</h1>
          <div className="mt-3" />
          <div className="flex gap-3">
            <DistanceTimeInfo />
            <TransportList
              transportMode={transportMode}
              setTransportMode={setTransportMode}
            />
          </div>
          <div className="mt-3" />
          <p>설명 어쩌구저쩌구임시설명</p>
          <div className="mt-7" />
          <button
            type="button"
            className="cursor-pointer mb-[24px] bg-white rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px]"
          >
            여행 시작하기
          </button>
        </div>
        <img className="object-cover w-full h-full" src={data[0].firstimage} />
      </div>
    </div>
  );
}
