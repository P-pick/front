import { useEffect, useMemo, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import usePedestrianDestination from './service/getPedestrainData';
import { transportation } from './lib';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function GeoMap() {
  //GuDoYoon 내 위치 정보 가져오기 hook으로 교체 예정
  const [geoLocation, setGeoLocation] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setGeoLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);
  const destinationLocation = usePedestrianDestination({
    startX: geoLocation.lng,
    startY: geoLocation.lat,
    startName: '출발지',
    endX: destination.lng,
    endY: destination.lat,
    endName: '목적지',
  });

  const polylines = transportation.Pedestrian(destinationLocation?.features);

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
          center={{ lat: geoLocation.lat, lng: geoLocation.lng }}
          className="w-full h-full"
          level={6}
        >
          {polylines.map(line => (
            <Polyline
              key={line.id}
              path={line.path}
              strokeWeight={5}
              strokeColor={'#007bff'}
              strokeOpacity={0.8}
              strokeStyle={'solid'}
            />
          ))}
          <MapMarker position={{ lat: geoLocation.lat, lng: geoLocation.lng }}>
            현재위치
          </MapMarker>
          <MapMarker position={destination}>목적지</MapMarker>
        </Map>
      </div>
    </div>
  );
}
