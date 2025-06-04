import type { GeoTripLocation } from '../types';

function getCurrentLocation(
  options?: PositionOptions
): Promise<GeoTripLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      error => {
        reject(error);
      },
      options
    );
  });
}

export default getCurrentLocation;
