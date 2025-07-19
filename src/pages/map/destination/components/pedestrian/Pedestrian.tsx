import { useSuspenseQuery } from '@tanstack/react-query';
import destinationQueries from '../../service/queryOptions';
import type { GeoTripLocation } from '@/pages/types';
import { Map } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { useMapLevel, useTransportation } from '../../store';
import { FollowAlong, SelectedFollow } from '../follow';
import useFollowAlong from '../../store/useFollowAlong';
import { CurrentDeviceLocation } from '@/pages/map/components';
import GeoSearchOptions from '../GeoSearchOptions';
import ResizingMap from '../ResizingMap';
import { useMemo } from 'react';
import type { PedestrianFeatures, PedestrianSearchOption } from '../../types';
import PedestrianPolylines from './PedestrianPolylines';

interface PedestrianProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function Pedestrian({ start, end }: PedestrianProps) {
  const { vehicle, searchOptions } = useStore(useTransportation);
  const { mapLevel, setMapLevel } = useStore(useMapLevel);
  const { isFollowAlong } = useStore(useFollowAlong);

  const pedestrianOptions = useSuspenseQuery(
    destinationQueries.pedestrian({
      startX: start.lng,
      startY: start.lat,
      endX: end.lng,
      endY: end.lat,
      startName: '현재위치',
      endName: '목적지',
    }),
  ).data;

  const points = useMemo(() => {
    return pedestrianOptions.flatMap(data => {
      const feature = data.features as PedestrianFeatures[];
      return feature
        .filter(filterData => filterData.geometry.type === 'Point')
        .map(point => ({
          lat: point.geometry.coordinates[1],
          lng: point.geometry.coordinates[0],
        }));
    }) as GeoTripLocation[];
  }, [pedestrianOptions]);

  return (
    <Map
      id="pedestrian-map"
      className="flex-1 relative w-full h-full"
      center={start}
      level={mapLevel}
      onZoomChanged={map => {
        setMapLevel(map.getLevel());
      }}
    >
      <ResizingMap points={points} />
      {pedestrianOptions &&
        pedestrianOptions.map(data => (
          <div key={`${vehicle}-${data.optionId}`}>
            <PedestrianPolylines
              destination={data.features as PedestrianFeatures[]}
              searchOption={data.optionId as PedestrianSearchOption}
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
          <GeoSearchOptions features={pedestrianOptions} />
          <FollowAlong />
        </>
      )}
    </Map>
  );
}
