import { tourQueries } from '@/entities/tour';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TourInfoCard } from '@/features/tourList';

interface BookmarkCardProps {
  contentId: string;
}

export default function BookmarkCard({ contentId }: BookmarkCardProps) {
  const { data: tourCommon } = useSuspenseQuery(
    tourQueries.detailCommon(contentId),
  );

  return (
    <li className="w-full">
      <TourInfoCard tourInfo={{ ...tourCommon, dist: '123' }} />
    </li>
  );
}
