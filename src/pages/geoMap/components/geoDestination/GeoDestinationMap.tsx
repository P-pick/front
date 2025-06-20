import { Map } from 'react-kakao-maps-sdk';
import { selectedTransportation } from '../../service';
import ResizingMap from './ResizingMap';
import type { GeoTripLocation } from '@/pages/types';
import SelectTransportationFromGeoMap from './SelectTransportationFromGeoMap';
import { GetPolylines } from './polylines';
import GeoSearchOptions from './GeoSearchOptions';
import { useTransportation } from '../../store';
import { useStore } from 'zustand';

interface GeoDestinationMapProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function GeoDestinationMap({
  start,
  end,
}: GeoDestinationMapProps) {
  const { vehicle } = useStore(useTransportation);
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
      <SelectTransportationFromGeoMap />
      <ResizingMap start={start} end={end} />
      {features &&
        features.map(data => (
          <GetPolylines
            key={`${vehicle}-${data.optionId}`}
            destination={data.features}
            searchOption={data.optionId}
          />
        ))}
      <GeoSearchOptions features={features} />
    </Map>
  );
}
