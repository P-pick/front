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
import { useMemo, useEffect } from 'react';
import type { PedestrianFeatures } from '../types';

interface GeoDestinationMapProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

function GeoDestinationMap({ start, end }: GeoDestinationMapProps) {
  const {
    vehicle,
    searchOptions,
    reset: resetTransportation,
  } = useStore(useTransportation);
  const { mapLevel, setMapLevel, reset: resetMapLevel } = useStore(useMapLevel);
  const { isFollowAlong, reset: resetFollowAlong } = useStore(useFollowAlong);
  const features = selectedTransportation(vehicle, {
    startX: start.lng,
    startY: start.lat,
    startName: '현재위치',
    endX: end.lng,
    endY: end.lat,
    endName: '목적지',
  });

  const points = useMemo(() => {
    return features.flatMap(data => {
      const feature = data.features as PedestrianFeatures[];
      return feature
        .filter(filterData => filterData.geometry.type === 'Point')
        .map(point => ({
          lat: point.geometry.coordinates[1],
          lng: point.geometry.coordinates[0],
        }));
    }) as GeoTripLocation[];
  }, [features]);

  //언마운트 시 클린업
  useEffect(() => {
    return () => {
      resetTransportation();
      resetMapLevel();
      resetFollowAlong();
    };
  }, [resetTransportation, resetMapLevel, resetFollowAlong]);

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
        <ResizingMap points={points} />
        {features &&
          features.map(data => (
            <div key={`${vehicle}-${data.optionId}`}>
              <GetPolylines
                destination={data.features}
                searchOption={data.optionId}
              />
              {isFollowAlong && data.optionId === searchOptions && (
                <SelectedFollow
                  firstIndexPosition={start}
                  followFeatures={data.features}
                />
              )}
            </div>
          ))}
        <CurrentDeviceLocation />
        {!isFollowAlong && (
          <>
            <GeoSearchOptions features={features} />
            <FollowAlong />
          </>
        )}
      </Map>
    </>
  );
}

export default withDestination(GeoDestinationMap);
