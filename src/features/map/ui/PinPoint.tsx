import type { GeoTripLocation } from '@/shared';
import { MapMarker } from 'react-kakao-maps-sdk';

interface PinPointProps {
  position: GeoTripLocation;
}

export const StartPin = ({ position }: PinPointProps) => {
  return (
    <MapMarker
      position={position}
      image={{
        src: '/startPin.svg',
        size: {
          width: 45,
          height: 59,
        },
        options: {
          offset: {
            x: 23,
            y: 46,
          },
        },
      }}
    />
  );
};

export const EndPin = ({ position }: PinPointProps) => {
  return (
    <MapMarker
      position={position}
      image={{
        src: '/endPin.svg',
        size: {
          width: 45,
          height: 59,
        },
        options: {
          offset: {
            x: 23,
            y: 46,
          },
        },
      }}
    />
  );
};
