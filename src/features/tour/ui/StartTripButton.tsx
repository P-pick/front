import { useStartTrip } from '@/features/tour';

import type { GeoTripLocation } from '@/shared';

interface StartTripButtonProps extends GeoTripLocation {
  contentId: string;
  className?: string;
}

export default function StartTripButton({
  lng,
  lat,
  contentId,
  className,
}: StartTripButtonProps) {
  const { handleStartTrip } = useStartTrip();

  return (
    <button
      id="tour-start-tutorial"
      type="button"
      className={className}
      onClick={() => {
        handleStartTrip({
          lng,
          lat,
          contentId,
        });
      }}
    >
      여행 시작하기
    </button>
  );
}
