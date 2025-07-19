import type { PedestrianFeatures, PedestrianSearchOption } from '../../types';
import { Polyline } from 'react-kakao-maps-sdk';
import isSelectedOptions from '../../lib/isSelectedOptions';
import type { PointProperties } from '../../types/pedestrianType';
import { useMapController } from '../../lib';
import Point from '../Point';

export default function PedestrianPolylines({
  destination,
  searchOption,
}: {
  destination: PedestrianFeatures[];
  searchOption: PedestrianSearchOption;
}) {
  const { handleGoToFollowPin } = useMapController();

  return destination.map(feature => {
    const { geometry, properties } = feature;

    if (geometry.type === 'Point') {
      const path = [
        { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
      ];
      const spProperties = properties as PointProperties;
      return (
        <>
          {isSelectedOptions(searchOption) && (
            <Point
              key={`pedestrian-point-${searchOption}-${spProperties.index}`}
              position={path[0]}
              pointType={spProperties.pointType}
              zIndex={2}
              onClick={() =>
                handleGoToFollowPin(path[0], spProperties.pointIndex)
              }
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
          strokeColor={isSelectedOptions(searchOption) ? '#007bff' : '#999999'}
          strokeOpacity={0.8}
          strokeWeight={5}
          zIndex={isSelectedOptions(searchOption) ? 2 : 1}
        />
      );
    }
  });
}
