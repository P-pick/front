import type {
  PedestrianFeatures,
  PedestrianPointProperties,
} from '../../types';

const getPedestrianDestinationPath = (
  destination: PedestrianFeatures[] = []
) => {
  return destination.map(feature => {
    const { geometry, properties } = feature;

    if (geometry.type === 'LineString') {
      const path = geometry.coordinates.map(coord => ({
        lat: coord[1],
        lng: coord[0],
      }));

      return {
        id: properties.index,
        path,
        color: '#007bff',
        stock: 5,
      };
    }

    if (geometry.type === 'Point') {
      const path = [
        { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
      ];
      const spProperties = properties as PedestrianPointProperties;
      if (spProperties.pointType === 'SP') {
        return {
          id: properties.index,
          path,
          color: '#888888',
          stock: 1,
          totalTime: spProperties.totalTime,
          totalDistance: spProperties.totalDistance,
        };
      }

      return {
        id: properties.index,
        path,
        color: '#000000',
        stock: 7,
      };
    }
  });
};

export default getPedestrianDestinationPath;
