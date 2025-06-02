import api from '@/config/instance';
import BackButton from './ui/BackButton';
import { useEffect, useState } from 'react';

export default function GeoTrip() {
  const [data, setData] = useState(null);
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`현재 위치: 위도 ${latitude}, 경도 ${longitude}`);
      },
      error => {
        console.error('위치 정보를 가져오는 중 오류 발생:', error.message);
      },
      {
        enableHighAccuracy: true, // 높은 정확도 요청 (GPS 등)
        timeout: 5000, // 최대 대기 시간 (밀리초)
        maximumAge: 0, // 캐시된 위치 정보 사용 안 함
      }
    );
  } else {
    console.error('이 브라우저는 Geolocation을 지원하지 않습니다.');
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/locationBasedList2');
        setData(res.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    }

    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <BackButton />
      {data ? <div>{/* 데이터를 활용한 렌더링 */}</div> : <p>로딩 중...</p>}
    </>
  );
}
