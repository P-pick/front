import type { GeoTripLocation } from '@/pages/types';
import getCurrentLocation from './getCurrentLocation';

let locationCache: GeoTripLocation | null = null;
let locationPromise: Promise<GeoTripLocation> | null = null;
let locationError: unknown = null;

export default function getSuspenseLocation(): GeoTripLocation {
  if (locationCache) return locationCache;
  if (locationError) throw locationError;

  if (!locationPromise) {
    locationPromise = getCurrentLocation()
      .then(loc => {
        locationCache = loc;
        return loc;
      })
      .catch(err => {
        locationError = err;
        throw err;
      });
  }

  throw locationPromise;
}
