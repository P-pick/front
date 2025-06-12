import type { GeoTripLocation } from '@/pages/types';
import { useResizingMapLevel } from '../../lib/transportation/useResizingMapLevel';

interface ResizingMapProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function ResizingMap({ start, end }: ResizingMapProps) {
  useResizingMapLevel({ points: [start, end] });
  return <></>;
}
