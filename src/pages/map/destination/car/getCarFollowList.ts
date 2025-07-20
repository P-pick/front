import type {
  CarFeatures,
  CarFollowFeature,
  CarPointProperties,
} from '../types';

const getCarFollowList = (
  destination: CarFeatures[] = [],
): CarFollowFeature[] => {
  return destination
    .map(feature => {
      const { geometry, properties } = feature;

      if (geometry.type === 'Point') {
        const spProperties = properties as CarPointProperties;
        const result: CarFollowFeature = {
          id: `${spProperties.index}`,
          path: [
            {
              lat: geometry.coordinates[1],
              lng: geometry.coordinates[0],
            },
          ],
          description: spProperties.description,
          index: spProperties.index,
          turnType: spProperties.turnType,
        };
        if (spProperties.pointType === 'S') {
          result.totalTime = spProperties.totalTime;
          result.totalDistance = spProperties.totalDistance;
          result.taxiFare = spProperties.taxiFare;
        }

        return result;
      }

      return undefined;
    })
    .filter((path): path is CarFollowFeature => path !== undefined);
};

export default getCarFollowList;
