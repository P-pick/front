import type Location from '../types/Location';
import { useState, useEffect } from 'react';

const useGeolocation = (options?: PositionOptions) => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setIsLoading(false);
      setLocation({ latitude, longitude });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setIsLoading(false);
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );
  }, []);

  return { location, isLoading, error };
};

export default useGeolocation;
