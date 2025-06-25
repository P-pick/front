import { TOUR_TYPE } from '@/pages/const/MARKER';
import type { AroundContentTypeId } from '@/pages/map/aroundSearch/types';
interface TourTypeBadgeProps {
  contenttypeid: AroundContentTypeId;
  className?: string;
}

export default function TourTypeBadge({
  contenttypeid,
  className,
}: TourTypeBadgeProps) {
  return (
    <span
      className={`rounded-2xl bg-[#EDEDED] py-1 px-2 text-[#595959] text-[8px] ${className}`}
    >
      {TOUR_TYPE[contenttypeid]}
    </span>
  );
}
