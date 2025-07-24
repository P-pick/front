import { useMemo } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { useSuspenseQuery } from '@tanstack/react-query';

import { CurrentDeviceLocation } from '@/features/map';
import {
  FollowAlong,
  ResizingMap,
  useFollowAlongStore,
  useMapLevelStore,
  useTransportationStore,
} from '@/features/navigate';
import {
  PedestrianPolylines,
  PedestrianFollowList,
  PedestrianOptions,
} from '@/features/pedestrian';

import { destinationQueries } from '@/entities/navigate';

import type { PEDESTRIAN } from '@/entities/navigate';
import type { GeoTripLocation } from '@/shared';

interface PedestrianProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function Pedestrian({ start, end }: PedestrianProps) {
  const { vehicle, searchOptions } = useStore(useTransportationStore);
  const { mapLevel, setMapLevel } = useStore(useMapLevelStore);
  const { isFollowAlong } = useStore(useFollowAlongStore);

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
      const feature = data.features as PEDESTRIAN.PedestrianFeatures[];
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
              destination={data.features as PEDESTRIAN.PedestrianFeatures[]}
              searchOption={data.optionId as PEDESTRIAN.SearchOptions}
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
