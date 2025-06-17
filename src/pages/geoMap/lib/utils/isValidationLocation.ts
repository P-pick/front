import type { GeoTripLocation } from '@/pages/types';

const isValidLocation = (
  location: GeoTripLocation
): location is Required<GeoTripLocation> => {
  return location.lat !== 0 && location.lng !== 0;
};

export default isValidLocation;
