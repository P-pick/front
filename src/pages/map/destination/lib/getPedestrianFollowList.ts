import type {
  PedestrianFeatures,
  PedestrianPointProperties,
  PedestrianFollowFeature,
} from '../types';

const getPedestrianFollowList = (
  destination: PedestrianFeatures[] = []
): PedestrianFollowFeature[] => {
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
          description: properties.description,
          index: properties.index,
        };
      }

      if (geometry.type === 'Point') {
        const path = [
          { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
        ];
        const spProperties = properties as PedestrianPointProperties;
        const result: PedestrianFollowFeature = {
          id: `${spProperties.index}`,
          path,
          description: spProperties.description,
          index: spProperties.index,
          turnType: spProperties.turnType,
        };

        if (spProperties.pointType === 'SP') {
          result.totalTime = spProperties.totalTime;
          result.totalDistance = spProperties.totalDistance;
        }

        return result;
      }

      return undefined;
    })
    .filter((path): path is PedestrianFollowFeature => path !== undefined);
};

export default getPedestrianFollowList;
