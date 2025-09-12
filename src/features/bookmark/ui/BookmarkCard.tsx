import { tourQueries } from '@/entities/tour';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TourInfoCard } from '@/features/tourList';
import { getDistanceFromLatLonInMeters } from '@/features/tourSearch';
import { getSuspenseLocation } from '@/shared/';

interface BookmarkCardProps {
  contentId: string | undefined;
}

export default function BookmarkCard({ contentId }: BookmarkCardProps) {
  const { data: tourCommon } = useSuspenseQuery(
    tourQueries.detailCommon(contentId || '0'),
  );
  const location = getSuspenseLocation();

  return (
    <div className="w-full">
      <TourInfoCard
        tourInfo={{
          ...tourCommon,
          dist: String(
            getDistanceFromLatLonInMeters(
              tourCommon.mapy,
              tourCommon.mapx,
              location.lat,
              location.lng,
            ),
          ),
        }}
      />
    </div>
  );
}
