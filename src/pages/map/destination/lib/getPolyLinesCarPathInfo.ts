import type {
  CarFeatures,
  CarPointProperties,
  CarFollowFeature,
  CarLineStringProperties,
} from '../types';

const getCoordinatesPointLines = (coords: number[][]) => {
  return coords.map(coord => ({
    lat: coord[1],
    lng: coord[0],
  }));
};

const getCarDestinationPath = (
  destination: CarFeatures[] = []
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

      if (geometry.type === 'LineString') {
        const coords = geometry.coordinates;

        const path = getCoordinatesPointLines(coords);
        const lineProperties = properties as CarLineStringProperties;

        return [
          {
            id: `${properties.index}-full`,
            path,
            description: lineProperties.description,
            index: lineProperties.index,
            roadType: lineProperties.roadType,
            facilityType: lineProperties.facilityType,
            totalTime: 0,
            totalDistance: 0,
            taxiFare: 0,
          },
        ];
      }

      return undefined;
    })
    .filter((path): path is CarFollowFeature => path !== undefined);
};

export default getCarDestinationPath;
