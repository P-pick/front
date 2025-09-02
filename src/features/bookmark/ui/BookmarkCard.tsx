import { tourQueries } from '@/entities/tour';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TourInfoCard } from '@/features/tourList';
import { getDistanceFromLatLonInMeters } from '@/features/tourSearch';
import { getSuspenseLocation } from '@/shared/';

interface BookmarkCardProps {
  contentId: string;
}

export default function BookmarkCard({ contentId }: BookmarkCardProps) {
  const { data: tourCommon } = useSuspenseQuery(
    tourQueries.detailCommon(contentId),
  );
  const location = getSuspenseLocation();

  return (
    <li className="w-full">
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
    </li>
  );
}
