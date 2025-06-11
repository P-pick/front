import { useResizingMapLevel } from '../../lib/transportation/useResizingMapLevel';

type positionType = {
  lat: number;
  lng: number;
};

interface ResizingMapProps {
  start: positionType;
  end: positionType;
}

export default function ResizingMap({ start, end }: ResizingMapProps) {
  useResizingMapLevel({ points: [start, end] });
  return <></>;
}
