import type { GeoTripLocation } from '@/pages/types';
import { useEffect, useState } from 'react';

export function useAddressFromCoords({ lng, lat }: GeoTripLocation) {
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
        }
      });
    });
  }, [lng, lat]);

  return address;
}
