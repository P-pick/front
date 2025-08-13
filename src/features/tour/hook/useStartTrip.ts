import { useNavigate } from 'react-router-dom';

import type { GeoTripLocation } from '@/shared';

export const useStartTrip = () => {
  const navigate = useNavigate();

  const handleStartTrip = (destination: GeoTripLocation) => {
    const { lng, lat } = destination;
    navigate(`/map/destination?lnt=${lng}&lat=${lat}&vehicle=pedestrian`);
  };

  return { handleStartTrip };
};
