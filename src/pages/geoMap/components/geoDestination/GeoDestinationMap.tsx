import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { selectedTransportation } from '../../service';
import ResizingMap from './ResizingMap';
import type { GeoTripLocation } from '@/pages/types';
import type { TransportationType } from '../../types';
import SelectTransportationFromGeoMap from './SelectTransportationFromGeoMap';
import DestinationDetail from './DestinationDetail';
import { GetPolylines } from './polylines';
import GeoSearchOptions from './GeoSearchOptions';

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
      <GetPolylines key={vehicle} vehicle={vehicle} destination={features} />
      <GeoSearchOptions vehicle={vehicle} features={features} />
    </Map>
  );
}
