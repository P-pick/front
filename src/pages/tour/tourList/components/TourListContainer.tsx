import { withGeoTripParams } from '@/pages/tour/components/withGeoTripParams';

function TourListContainer() {
  return <div className="flex flex-col h-full w-full"></div>;
}

export default withGeoTripParams(TourListContainer);
