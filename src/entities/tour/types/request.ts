import type { GeoTripLocation } from '@/shared';
import type { AroundContentTypeId } from '.';

export type LocationBasedInfiniteQueryParams = {
  location: GeoTripLocation;
  contentTypeId: AroundContentTypeId;
  radius: string;
  initialPageParam?: number;
  numOfRows?: number;
};
