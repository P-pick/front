interface TourOverviewProps {
  description: string;
}

export default function TourOverview({ description }: TourOverviewProps) {
  return (
    <div className="break-all text-xm text-black px-5 pb-6">{description}</div>
  );
}
