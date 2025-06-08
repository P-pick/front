import { useEffect, useState } from 'react';
import { selectedTransportation } from '../service';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import useCurrentLocation from '@/lib/useCurrentLocation';
import { useResizingMapLevel } from '../lib/transportation/useResizingMapLevel';
import DrawingLineToDestination from './geoDestination/DrawingLineToDestination';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};
export default function GeoDestination() {
  const { geoLocation } = useCurrentLocation();

  const [vehicle, setVehicle] = useState<'car' | 'pedestrian'>('pedestrian');

  const polylines = selectedTransportation(vehicle, {
    startX: geoLocation.lng,
    startY: geoLocation.lat,
    startName: '현재위치',
    endX: destination.lng,
    endY: destination.lat,
    endName: '목적지',
  });

  const onChangeVehicle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicle(e.target.value as 'car' | 'pedestrian');
  };

  return (
    <Map
      id="map"
      center={{ lat: geoLocation.lat, lng: geoLocation.lng }}
      className="w-full h-full relative"
      level={6}
    >
      <select
        className="p-3 bg-blue-300 absolute left-0 top-0 z-10"
        onChange={onChangeVehicle}
      >
        <option value="pedestrian">보행자</option>
        <option value="car">자동차</option>
      </select>
      {polylines?.map(line => (
        <DrawingLineToDestination
          line={line}
          start={geoLocation}
          end={destination}
        />
      ))}
      <MapMarker
        position={{ lat: geoLocation.lat, lng: geoLocation.lng }}
        image={{
          src: '/myGeo.png',
          size: {
            width: 38,
            height: 38,
          },
        }}
      ></MapMarker>
      <MapMarker position={destination}>목적지</MapMarker>
    </Map>
  );
}
