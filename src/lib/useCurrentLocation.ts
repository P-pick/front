import { getCurrentLocation } from '@/pages/geotrip/lib';
import type { GeoTripLocation } from '@/pages/types';
import { useEffect, useState } from 'react';

const useCurrentLocation = () => {
  const [geoLocation, setGeoLocation] = useState<GeoTripLocation>({
    lat: null,
    lng: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const location = await getCurrentLocation();
        setGeoLocation(location);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('위치 정보 가져오는 중 에러 발생')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { geoLocation, isLoading, error };
};

export default useCurrentLocation;
