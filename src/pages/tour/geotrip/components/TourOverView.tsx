import { getTourDetailQueryOptions } from '@/pages/tour/service';
import { useSuspenseQuery } from '@tanstack/react-query';
interface TourOverViewProps {
  contentId: string | null;
}

export default function TourOverView({ contentId }: TourOverViewProps) {
  const { data } = useSuspenseQuery(getTourDetailQueryOptions({ contentId }));

  return <div className="overflow-auto px-4">{data.overview}</div>;
}
