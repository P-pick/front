import type { GeoTripLocation } from '@/shared';

const isValidLocation = (
  location: GeoTripLocation,
): location is Required<GeoTripLocation> => {
  return location.lat !== 0 && location.lng !== 0;
};

export default isValidLocation;
