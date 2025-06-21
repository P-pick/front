import type { PedestrianFeatures } from '@/pages/geoMap/types';
import type { PointProperties } from '@/pages/geoMap/types/pedestrianType';
import { Polyline } from 'react-kakao-maps-sdk';
import Point from './Point';

export default function PedestrianPolylines({
  destination,
}: {
  destination: PedestrianFeatures[];
}) {
  return destination.map(feature => {
    const { geometry, properties } = feature;

    if (geometry.type === 'Point') {
      const path = [
        { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
      ];
      const spProperties = properties as PointProperties;

      return (
        <Point
          key={`pedestrian-${spProperties.index}`}
          position={path[0]}
          pointType={spProperties.pointType}
          zIndex={2}
        />
      );
    }

    if (geometry.type === 'LineString') {
      const path = geometry.coordinates.map(coord => ({
        lat: coord[1],
        lng: coord[0],
      }));

      return (
        <Polyline
          key={`pedestrian-${properties.index}`}
          path={path}
          strokeColor="#007bff"
          strokeOpacity={0.8}
          strokeWeight={5}
          zIndex={1}
        />
      );
    }
  });
}
