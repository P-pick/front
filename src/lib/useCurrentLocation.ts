import { getCurrentLocation } from '@/pages/geotrip/lib';
import { useEffect, useState } from 'react';

const useCurrentLocation = () => {
  const [geoLocation, setGeoLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  useEffect(() => {
    getCurrentLocation().then(location => {
      setGeoLocation({
        lat: location.latitude!,
        lng: location.longitude!,
      });
    });
  }, []);

  return { geoLocation };
};

export default useCurrentLocation;
