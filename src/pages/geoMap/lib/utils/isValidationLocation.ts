import type { GeoTripLocation } from '@/pages/types';

const isValidLocation = (
  location: GeoTripLocation
): location is Required<GeoTripLocation> => {
  return location.lat !== null && location.lng !== null;
};

export default isValidLocation;
