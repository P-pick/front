import { Map } from 'react-kakao-maps-sdk';
import ResizingMap from './ResizingMap';
import type { GeoTripLocation } from '@/pages/types';
import SelectTransportationFromGeoMap from './SelectTransportationFromGeoMap';
import { GetPolylines } from './polylines';
import GeoSearchOptions from './GeoSearchOptions';
import { useStore } from 'zustand';
import { useMapLevel, useTransportation } from '../store';
import { selectedTransportation } from '../service';
import CurrentDeviceLocation from '../../components/CurrentDeviceLocation';
import useFollowAlong from '../store/useFollowAlong';
import { FollowAlong, SelectedFollow } from './follow';
import withDestination from './withDestination';

interface GeoDestinationMapProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

function GeoDestinationMap({ start, end }: GeoDestinationMapProps) {
  const { vehicle, searchOptions } = useStore(useTransportation);
  const { mapLevel, setMapLevel } = useStore(useMapLevel);
  const { isFollowAlong } = useStore(useFollowAlong);
  const features = selectedTransportation(vehicle, {
    startX: start.lng,
    startY: start.lat,
    startName: '현재위치',
    endX: end.lng,
    endY: end.lat,
    endName: '목적지',
  });

  return (
    <>
      <Map
        id="map"
        center={start}
        className="flex-1 w-full h-full relative"
        level={mapLevel}
        onZoomChanged={map => {
          setMapLevel(map.getLevel());
        }}
      >
        {!isFollowAlong && (
          <SelectTransportationFromGeoMap start={start} end={end} />
        )}
        <ResizingMap points={[start, end]} />
        {features &&
          features.map(data => (
            <>
              <GetPolylines
                key={`${vehicle}-${data.optionId}`}
                destination={data.features}
                searchOption={data.optionId}
              />
              {isFollowAlong && data.optionId === searchOptions && (
                <SelectedFollow followFeatures={data.features} />
              )}
            </>
          ))}
        <CurrentDeviceLocation />
        {!isFollowAlong && (
          <>
            <GeoSearchOptions features={features} />
            <FollowAlong firstIndex={start} />
          </>
        )}
      </Map>
    </>
  );
}

export default withDestination(GeoDestinationMap);
