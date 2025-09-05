import type { GeoTripLocation } from '@/shared';

const getCurrentLocation = (
  options?: PositionOptions,
): Promise<GeoTripLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      error => {
        reject(error);
      },
      options,
    );
  });
};

export default getCurrentLocation;
