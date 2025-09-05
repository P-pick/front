import { MapMarker } from 'react-kakao-maps-sdk';

import { getSuspenseLocation } from '@/shared';

export default function CurrentDeviceLocation() {
  const geoLocation = getSuspenseLocation();

  return (
    <MapMarker
      position={{
        lat: geoLocation.lat!,
        lng: geoLocation.lng!,
      }}
      image={{
        src: '/myLocation.svg',
        size: {
          width: 38,
          height: 38,
        },
      }}
      zIndex={999}
    ></MapMarker>
  );
}
