import type {
  PedestrianFeatures,
  PedestrianPointProperties,
  PedestrianPolyFeature,
} from '../../types';

const getPedestrianDestinationPath = (
  destination: PedestrianFeatures[] = []
): PedestrianPolyFeature[] => {
  return destination
    .map(feature => {
      const { geometry, properties } = feature;

      if (geometry.type === 'LineString') {
        const path = geometry.coordinates.map(coord => ({
          lat: coord[1],
          lng: coord[0],
        }));

        return {
          id: `${properties.index}`,
          path,
          color: '#007bff',
          stock: 5,
          zIndex: 1,
        };
      }

      if (geometry.type === 'Point') {
        const path = [
          { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
        ];
        const spProperties = properties as PedestrianPointProperties;
        const result: PedestrianPolyFeature = {
          id: `${spProperties.index}`,
          path,
          color: '#ffffff',
          stock: 8,
          zIndex: 2,
        };

        if (spProperties.pointType === 'SP') {
          result.totalTime = spProperties.totalTime;
          result.totalDistance = spProperties.totalDistance;
        }

        return result;
      }

      return undefined;
    })
    .filter((path): path is PedestrianPolyFeature => path !== undefined);
};

export default getPedestrianDestinationPath;
