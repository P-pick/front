import { tourQueries } from '@/entities/tour';
import { useSuspenseQueries } from '@tanstack/react-query';

interface BookmarkCardProps {
  contentId: string;
}

export default function BookmarkCard({ contentId }: BookmarkCardProps) {
  const tourResponse = useSuspenseQueries({
    queries: [
      tourQueries.detailCommon(contentId),
      tourQueries.detailImages(contentId),
    ],
  });
  console.log(tourResponse[0].data);
  console.log(tourResponse[1].data);
  return (
    <div>
      <h3>{contentId}</h3>
    </div>
  );
}
