import { useSuspenseQuery } from '@tanstack/react-query';
import type { GeoTripLocation } from '@/pages/types';
import { Map } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { CurrentDeviceLocation } from '@/pages/map/components';
import { useMemo } from 'react';
import PedestrianPolylines from './PedestrianPolylines';
import PedestrianFollowList from './PedestrianFollowList';
import PedestrianOptions from './PedestrianOptions';
import { useMapLevel, useTransportation } from '../store';
import useFollowAlong from '../store/useFollowAlong';
import destinationQueries from '../service/queryOptions';
import type { PedestrianFeatures, PedestrianSearchOption } from '../types';
import { FollowAlong, ResizingMap } from '../components';

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
              <PedestrianFollowList start={start} destination={data.features} />
            )}
          </div>
        ))}
      <CurrentDeviceLocation />
      {!isFollowAlong && (
        <>
          <PedestrianOptions options={pedestrianOptions} />
          <FollowAlong />
        </>
      )}
    </Map>
  );
}
