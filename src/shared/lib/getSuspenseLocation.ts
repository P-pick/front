import { getCurrentLocation } from '@/shared';

import type { GeoTripLocation } from '@/shared';

type PermissionStateLite = 'granted' | 'denied' | 'prompt' | 'unknown';
type SuspenseLocation = GeoTripLocation & {
  permission: PermissionStateLite;
};

let locationCache: SuspenseLocation | null = null;
let locationPromise: Promise<GeoTripLocation> | null = null;
let locationError: unknown = null;

const DEFAULT_LOCATION = {
  lat: 37.574187,
  lng: 126.976882,
} as const;

export default function getSuspenseLocation(): SuspenseLocation {
  if (locationCache) return locationCache;
  if (locationError) throw locationError;

  if (!locationPromise) {
    locationPromise = getCurrentLocation()
      .then(loc => {
        locationCache = { ...loc, permission: 'granted' };
        return locationCache;
      })
      .catch(err => {
        return handleLocationError(err);
      });
  }

  throw locationPromise;
}

function isGeoLocationError(err: unknown): err is GeolocationPositionError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    typeof err.code === 'number'
  );
}

function handleLocationError(err: unknown) {
  if (isGeoLocationError(err)) {
    if (err.code === 1) {
      locationCache = { ...DEFAULT_LOCATION, permission: 'denied' };
      return locationCache;
    }

    if (err.code === 2) {
      throw new Error(
        '위치를 찾을 수 없습니다. GPS가 켜져 있는지 확인해주세요.',
      );
    }
  }

  locationError = err;
  throw err;
}
