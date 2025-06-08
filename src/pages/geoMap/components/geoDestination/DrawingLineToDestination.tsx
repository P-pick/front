import { Polyline } from 'react-kakao-maps-sdk';
import type { CarResponse, PedestrianResponse } from '../../types';
import { useResizingMapLevel } from '../../lib/transportation/useResizingMapLevel';

type positionType = {
  lat: number;
  lng: number;
};

interface DrawingLineToDestinationProps {
  line: PedestrianResponse | CarResponse;
  start: positionType;
  end: positionType;
}

export default function DrawingLineToDestination({
  line,
  start,
  end,
}: DrawingLineToDestinationProps) {
  useResizingMapLevel({ points: [start, end] });
  return (
    <Polyline
      key={line.id}
      path={line.path}
      strokeWeight={5}
      strokeColor={line.color}
      strokeOpacity={0.8}
      strokeStyle={'solid'}
    />
  );
}
