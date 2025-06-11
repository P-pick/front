import { useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { selectedTransportation } from '../../service';
import ResizingMap from './ResizingMap';

type Position = {
  lat: number;
  lng: number;
};

const CustomMarker = ({
  position,
  image,
}: {
  position: Position;
  image: string;
}) => {
  return (
    <MapMarker
      position={position}
      image={{
        src: image,
        size: {
          width: 45,
          height: 59,
        },
        options: {
          offset: {
            x: 23,
            y: 46,
          },
        },
      }}
    />
  );
};

interface GeoDestinationMapProps {
  start: Position;
  end: Position;
}

export default function GeoDestinationMap({
  start,
  end,
}: GeoDestinationMapProps) {
  const [vehicle, setVehicle] = useState<'car' | 'pedestrian'>('pedestrian');

  const onChangeVehicle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicle(e.target.value as 'car' | 'pedestrian');
  };

  const polylines = selectedTransportation(vehicle, {
    startX: start.lng,
    startY: start.lat,
    startName: '현재위치',
    endX: end.lng,
    endY: end.lat,
    endName: '목적지',
  });

  return (
    <Map
      id="map"
      center={{ lat: start.lat, lng: start.lng }}
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
      <ResizingMap start={start} end={end} />
      {polylines?.map(line => (
        <Polyline
          key={line.id}
          path={line.path}
          strokeWeight={5}
          strokeColor={line.color}
          strokeOpacity={0.8}
          strokeStyle={'solid'}
        />
      ))}
      <CustomMarker image="/startpin2.png" position={start} />
      <CustomMarker image="/endpin.png" position={end} />
    </Map>
  );
}
