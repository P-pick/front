import type { CarResponse } from '../../types';

const getCarDestinationPath = (destination: CarResponse['features'] = []) => {
  return destination.map(feature => {
    const { geometry, properties } = feature;
    const path =
      geometry.type === 'LineString'
        ? geometry.coordinates.map(coord => ({
            lat: coord[1],
            lng: coord[0],
          }))
        : geometry.type === 'Point'
        ? [{ lat: geometry.coordinates[1], lng: geometry.coordinates[0] }]
        : [];

    return {
      id: properties.index,
      path,
    };
  });
};

export default getCarDestinationPath;
