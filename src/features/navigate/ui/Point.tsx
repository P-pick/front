import { MapMarker } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';

import { useMapLevelStore } from '@/features/navigate';

import type { CAR, PEDESTRIAN } from '@/entities/navigate';
import { EndPin, StartPin } from '@/features/map';

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
    return <StartPin position={position} />;
  }

  if (
    pointType === ('E' as CAR.PointType) ||
    pointType === ('EP' as PEDESTRIAN.PointType)
  ) {
    return <EndPin position={position} />;
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
