import type { GeoTripLocation } from '@/shared';
import { useStartTrip } from '../';

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
      id="tour-start"
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
