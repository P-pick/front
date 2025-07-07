import { useGetTourDetailSuspenseQuery } from '@/pages/tour/service';
interface TourOverViewProps {
  contentId: string | null;
}

export default function TourOverView({ contentId }: TourOverViewProps) {
  const { data } = useGetTourDetailSuspenseQuery({ contentId });

  return <div className="overflow-auto px-4">{data.overview}</div>;
}
