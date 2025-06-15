import type { PedestrianResponse } from '../../types';

const getPedestrianDestinationPath = (
  destination: PedestrianResponse['features'] = []
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
        totalTime: properties.totalTime,
        totalDistance: properties.totalDistance,
      };
    }

    if (geometry.type === 'Point') {
      const path = [
        { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
      ];

      return {
        id: properties.index,
        path,
        color: '#000000',
        stock: 7,
        totalTime: properties.totalTime,
        totalDistance: properties.totalDistance,
      };
    }
  });
};

export default getPedestrianDestinationPath;
