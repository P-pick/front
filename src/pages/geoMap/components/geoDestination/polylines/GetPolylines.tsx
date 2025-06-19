import type {
  CarFeatures,
  PedestrianFeatures,
  PolyFeatures,
  TransportationType,
} from '@/pages/geoMap/types';
import PedestrianPolylines from './PedestrianPolylines';
import CarPolylines from './CarPolylines';

interface GetPolylinesProps {
  vehicle: TransportationType;
  destination: PolyFeatures;
}

export default function GetPolylines({
  vehicle,
  destination,
}: GetPolylinesProps) {
  const transportation = {
    pedestrian: (
      <PedestrianPolylines destination={destination as PedestrianFeatures[]} />
    ),
    car: <CarPolylines destination={destination as CarFeatures[]} />,
    bicycle: <CarPolylines destination={destination as CarFeatures[]} />,
    'public-transportation': (
      <CarPolylines destination={destination as CarFeatures[]} />
    ),
  } as const;
  return transportation[vehicle];
}
