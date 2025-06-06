import { getCurrentLocation } from '@/pages/geotrip/lib';
import { useEffect, useState } from 'react';

const useCurrentLocation = () => {
  const [geoLocation, setGeoLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const location = await getCurrentLocation();
        setGeoLocation({
          lat: location.latitude!,
          lng: location.longitude!,
        });
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
