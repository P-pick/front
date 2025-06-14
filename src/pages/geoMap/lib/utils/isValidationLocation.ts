import type { GeoTripLocation } from '@/pages/types';
import { useCallback } from 'react';

const useValidation = () => {
  const isValidLocation = useCallback(
    (location: GeoTripLocation): location is Required<GeoTripLocation> => {
      return location.lat !== null && location.lng !== null;
    },
    [location]
  );

  return { isValidLocation };
};

export default useValidation;
