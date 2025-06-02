import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}
export default function GeoMap() {
  const [geolocation, setLocation] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  useEffect(() => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-start items-center bg-blue-400">
        <button className="cursor-pointer p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <Map
          id="map"
          center={geolocation}
          className="w-full h-full"
          level={3}
        ></Map>
      </div>
    </div>
  );
}
