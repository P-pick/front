import type { PEDESTRIAN } from '@/entities/navigate';

const getPedestrianFollowList = (
  destination: PEDESTRIAN.PedestrianFeatures[] = [],
): PEDESTRIAN.PedestrianFollowFeature[] => {
  return destination
    .map(feature => {
      const { geometry, properties } = feature;

      if (geometry.type === 'Point') {
        const path = [
          { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
        ];
        const spProperties = properties as PEDESTRIAN.PointProperties;
        const result: PEDESTRIAN.PedestrianFollowFeature = {
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
    .filter(
      (path): path is PEDESTRIAN.PedestrianFollowFeature => path !== undefined,
    );
};

export default getPedestrianFollowList;
