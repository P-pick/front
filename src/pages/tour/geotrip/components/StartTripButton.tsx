import { useStartTrip } from '@/pages/tour/geotrip/lib';
import type { GeoTripLocation } from '@/pages/types';

interface StartTripButtonProps extends GeoTripLocation {
  className?: string;
}
export default function StartTripButton({
  lng,
  lat,
  className,
}: StartTripButtonProps) {
  const { handleStartTrip } = useStartTrip();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        handleStartTrip({
          lng,
          lat,
        });
      }}
    >
      여행 시작하기
    </button>
  );
}
