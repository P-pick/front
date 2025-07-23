import { useMemo } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { useSuspenseQuery } from '@tanstack/react-query';

import { destinationQueries } from '@/entities/navigate';

import { CarPolylines, CarFollowList, CarOptions } from '@/features/car';
import { CurrentDeviceLocation } from '@/features/map';
import {
  FollowAlong,
  ResizingMap,
  useFollowAlongStore,
  useMapLevelStore,
  useTransportationStore,
} from '@/features/navigate';

import type { CAR } from '@/entities/navigate';
import type { GeoTripLocation } from '@/shared';

interface CarProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function Car({ start, end }: CarProps) {
  const { vehicle, searchOptions } = useStore(useTransportationStore);
  const { mapLevel, setMapLevel } = useStore(useMapLevelStore);
  const { isFollowAlong } = useStore(useFollowAlongStore);

  const carOptions = useSuspenseQuery(
    destinationQueries.car({
      startX: start.lng,
      startY: start.lat,
      endX: end.lng,
      endY: end.lat,
      startName: '현재위치',
      endName: '목적지',
    }),
  ).data;

  const points = useMemo(() => {
    return carOptions.flatMap(data => {
      const feature = data.features as CAR.CarFeatures[];
      return feature
        .filter(filterData => filterData.geometry.type === 'Point')
        .map(point => ({
          lat: point.geometry.coordinates[1],
          lng: point.geometry.coordinates[0],
        }));
    }) as GeoTripLocation[];
  }, [carOptions]);

  return (
    <Map
      id="car-map"
      className="flex-1 relative w-full h-full"
      center={start}
      level={mapLevel}
      onZoomChanged={map => {
        setMapLevel(map.getLevel());
      }}
    >
      <ResizingMap points={points} />
      {carOptions &&
        carOptions.map(data => (
          <div key={`${vehicle}-${data.optionId}`}>
            <CarPolylines
              destination={data.features as CAR.CarFeatures[]}
              searchOption={data.optionId as CAR.SearchOptions}
            />
            {isFollowAlong && data.optionId === searchOptions && (
              <CarFollowList start={start} destination={data.features} />
            )}
          </div>
        ))}
      <CurrentDeviceLocation />
      {!isFollowAlong && (
        <>
          <CarOptions options={carOptions} />
          <FollowAlong />
        </>
      )}
    </Map>
  );
}
