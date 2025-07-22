interface TourOverViewProps {
  overView: string;
}

export default function TourOverView({ overView }: TourOverViewProps) {
  return <div className="overflow-auto px-4">{overView}</div>;
}
