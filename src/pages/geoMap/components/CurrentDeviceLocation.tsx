import useCurrentLocation from '@/lib/useCurrentLocation';
import { MapMarker } from 'react-kakao-maps-sdk';

export default function CurrentDeviceLocation() {
  const { geoLocation } = useCurrentLocation();

  return (
    <MapMarker
      position={{
        lat: geoLocation.lat!,
        lng: geoLocation.lng!,
      }}
      image={{
        src: '/myGeo.png',
        size: {
          width: 38,
          height: 38,
        },
      }}
    ></MapMarker>
  );
}
