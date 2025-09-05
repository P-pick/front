import { useNavigate } from 'react-router-dom';

import type { GeoTripLocation } from '@/shared';

interface StartTripButtonParams extends GeoTripLocation {
  contentId: string;
}

export const useStartTrip = () => {
  const navigate = useNavigate();

  const handleStartTrip = ({ lng, lat, contentId }: StartTripButtonParams) => {
    const encodedId = btoa(String(contentId));

    navigate(
      `/map/destination?lnt=${lng}&lat=${lat}&id=${encodedId}&vehicle=pedestrian`,
    );
  };

  return { handleStartTrip };
};
