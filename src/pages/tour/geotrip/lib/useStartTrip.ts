import type { GeoTripLocation } from '@/pages/types';
import { useNavigate } from 'react-router-dom';
const useStartTrip = () => {
  const navigate = useNavigate();

  const handleStartTrip = (destination: GeoTripLocation) => {
    const { lng, lat } = destination;
    navigate(`/map/destination?lnt=${lng}&lat=${lat}`);
  };

  return { handleStartTrip };
};

export default useStartTrip;
