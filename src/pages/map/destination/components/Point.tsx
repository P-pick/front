import type { PointType as PedestrianPointType } from '../types/pedestrianType';
import type { PointType as CarPointType } from '../types/carType';
import { MapMarker } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { useMapLevel } from '../store';

export interface PointProps {
  pointType: PedestrianPointType | CarPointType;
  position: {
    lat: number;
    lng: number;
  };
  zIndex?: number;
  onClick?: () => void;
}

//경유지 필요시 경유지 마커 조건분기
export default function Point({
  pointType,
  position,
  zIndex,
  onClick,
}: PointProps) {
  const { mapLevel } = useStore(useMapLevel);

  if (
    pointType === ('S' as CarPointType) ||
    pointType === ('SP' as PedestrianPointType)
  ) {
    return (
      <MapMarker
        onClick={onClick}
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
        zIndex={zIndex}
      />
    );
  }

  if (
    pointType === ('E' as CarPointType) ||
    pointType === ('EP' as PedestrianPointType)
  ) {
    return (
      <MapMarker
        onClick={onClick}
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
        zIndex={zIndex}
      />
    );
  }

  return (
    mapLevel < 6 && (
      <MapMarker
        onClick={onClick}
        position={position}
        image={{
          src: '/pointIcon.svg',
          size: {
            width: 12,
            height: 12,
          },
          options: {
            offset: {
              x: 6,
              y: 6,
            },
          },
        }}
        zIndex={zIndex}
      />
    )
  );
}
