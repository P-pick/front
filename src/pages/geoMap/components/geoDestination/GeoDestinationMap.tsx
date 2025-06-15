import { useMemo, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { selectedTransportation } from '../../service';
import ResizingMap from './ResizingMap';
import type { GeoTripLocation } from '@/pages/types';
import type { TransportationType } from '../../types';
import {
  getSelectedTransportationPolylines,
  timeConversion,
} from '../../lib/transportation';
import SelectTransportationFromGeoMap from './SelectTransportationFromGeoMap';
import DestinationDetail from './DestinationDetail';

const CustomMarker = ({
  position,
  image,
}: {
  position: Required<GeoTripLocation>;
  image: string;
}) => {
  return (
    <MapMarker
      position={{
        lat: position.lat!,
        lng: position.lng!,
      }}
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
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function GeoDestinationMap({
  start,
  end,
}: GeoDestinationMapProps) {
  const [vehicle, setVehicle] = useState<TransportationType>('pedestrian');
  const features = selectedTransportation(vehicle, {
    startX: start.lng,
    startY: start.lat,
    startName: '현재위치',
    endX: end.lng,
    endY: end.lat,
    endName: '목적지',
  });
  const polylines = useMemo(() => {
    if (features) {
      return getSelectedTransportationPolylines(vehicle, features);
    }
    return [];
  }, [vehicle, features]);

  const takeTimeToGo = useMemo(() => {
    if (polylines.length === 0 || !polylines[0]?.totalTime) {
      return null;
    }
    return timeConversion.conversionSecToHour(polylines[0].totalTime);
  }, [polylines]);

  return (
    <Map
      id="map"
      center={{ lat: start.lat!, lng: start.lng! }}
      className="w-full h-full relative"
      level={6}
    >
      <SelectTransportationFromGeoMap
        vehicle={vehicle}
        setVehicle={setVehicle}
      />
      <ResizingMap start={start} end={end} />
      {polylines?.map(
        line =>
          line && (
            <Polyline
              key={line.id}
              path={line.path}
              strokeWeight={5}
              strokeColor={line.color}
              strokeOpacity={0.8}
              strokeStyle={'solid'}
            />
          )
      )}
      <CustomMarker image="/startpin2.png" position={start} />
      <CustomMarker image="/endpin.png" position={end} />
      {takeTimeToGo && <DestinationDetail time={takeTimeToGo} />}
    </Map>
  );
}
