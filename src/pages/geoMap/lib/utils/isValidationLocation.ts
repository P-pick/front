import type { GeoTripLocation } from '@/pages/types';

const isValidLocation = (
  location: GeoTripLocation
): location is Required<GeoTripLocation> => {
  return location !== null;
};

export default isValidLocation;
