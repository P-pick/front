import { MapMarker } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';

import { useMapLevelStore } from '@/features/navigate';

import type { CAR, PEDESTRIAN } from '@/entities/navigate';

export interface PointProps {
  pointType: PEDESTRIAN.PointType | CAR.PointType;
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
  const { mapLevel } = useStore(useMapLevelStore);

  if (
    pointType === ('S' as CAR.PointType) ||
    pointType === ('SP' as PEDESTRIAN.PointType)
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
    pointType === ('E' as CAR.PointType) ||
    pointType === ('EP' as PEDESTRIAN.PointType)
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
