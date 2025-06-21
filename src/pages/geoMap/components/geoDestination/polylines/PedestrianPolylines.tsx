import type {
  PedestrianFeatures,
  PedestrianSearchOption,
} from '@/pages/geoMap/types';
import type { PointProperties } from '@/pages/geoMap/types/pedestrianType';
import { Polyline } from 'react-kakao-maps-sdk';
import Point from './Point';
import { useStore } from 'zustand';
import { useTransportation } from '@/pages/geoMap/store';
import { useMemo } from 'react';

export default function PedestrianPolylines({
  destination,
  searchOption,
}: {
  destination: PedestrianFeatures[];
  searchOption: PedestrianSearchOption;
}) {
  const { searchOptions: selectedSearchOption } = useStore(useTransportation);

  const isSelectedOption = useMemo(() => {
    return searchOption === selectedSearchOption;
  }, [searchOption]);

  return destination.map(feature => {
    const { geometry, properties } = feature;

    if (geometry.type === 'Point') {
      const path = [
        { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
      ];
      const spProperties = properties as PointProperties;

      return (
        <>
          {isSelectedOption && (
            <Point
              key={`pedestrian-point-${searchOption}-${spProperties.index}`}
              position={path[0]}
              pointType={spProperties.pointType}
              zIndex={2}
            />
          )}
        </>
      );
    }

    if (geometry.type === 'LineString') {
      const path = geometry.coordinates.map(coord => ({
        lat: coord[1],
        lng: coord[0],
      }));

      return (
        <Polyline
          key={`pedestrian-lineString-${searchOption}-${properties.index}`}
          path={path}
          strokeColor={isSelectedOption ? '#007bff' : '#999999'}
          strokeOpacity={0.8}
          strokeWeight={5}
          zIndex={isSelectedOption ? 2 : 1}
        />
      );
    }
  });
}
