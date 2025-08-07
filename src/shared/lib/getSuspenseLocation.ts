import { getCurrentLocation } from '@/shared';

import type { GeoTripLocation } from '@/shared';

let locationCache: GeoTripLocation | null = null;
let locationPromise: Promise<GeoTripLocation> | null = null;
let locationError: unknown = null;

const DEFAULT_LOCATION = {
  lat: 37.574187,
  lng: 126.976882,
} as const;

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
        if (err.code === 1) {
          // 권한 거부 시 기본 위치 사용
          locationCache = DEFAULT_LOCATION;
          return DEFAULT_LOCATION;
        }
        if (err.code === 2) {
          throw new Error(
            '위치를 찾을 수 없습니다. GPS가 켜져 있는지 확인해주세요.',
          );
        }

        locationError = err;
        throw err;
      });
  }

  throw locationPromise;
}
