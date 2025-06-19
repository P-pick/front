import { useMemo, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { selectedTransportation } from '../../service';
import ResizingMap from './ResizingMap';
import type { GeoTripLocation } from '@/pages/types';
import type { TransportationType } from '../../types';
import { getSelectedTransportationPolylines } from '../../lib/transportation';
import SelectTransportationFromGeoMap from './SelectTransportationFromGeoMap';
import DestinationDetail from './DestinationDetail';
import { gettingConversion } from '../../lib/utils';
import GetPolylines from './polylines/getPolylines';

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
    return gettingConversion.conversionSecToHour(polylines[0].totalTime);
  }, [polylines]);

  const takeDistanceToGo = useMemo(() => {
    if (polylines.length === 0 || !polylines[0]?.totalDistance) {
      return null;
    }
    return gettingConversion.conversionPathDistance(polylines[0].totalDistance);
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
      <GetPolylines key={vehicle} vehicle={vehicle} destination={features} />
      {takeTimeToGo && takeDistanceToGo && (
        <DestinationDetail time={takeTimeToGo} distance={takeDistanceToGo} />
      )}
    </Map>
  );
}
