import { useTransportation } from '../../store';
import type {
  CarFeatures,
  PedestrianFeatures,
  PolyFeatures,
} from '../../types';
import CarFollow from './CarFollow';
import PedestrianFollow from './PedestrianFollow';

interface SelectedFollowProps {
  followFeatures: PolyFeatures;
}

export default function SelectedFollow({
  followFeatures,
}: SelectedFollowProps) {
  const { vehicle } = useTransportation();

  const transportationFollow = {
    pedestrian: (
      <PedestrianFollow
        followFeatures={followFeatures as PedestrianFeatures[]}
      />
    ),
    car: <CarFollow followFeatures={followFeatures as CarFeatures[]} />,
    bicycle: <CarFollow followFeatures={followFeatures as CarFeatures[]} />,
    'public-transportation': (
      <CarFollow followFeatures={followFeatures as CarFeatures[]} />
    ),
  } as const;
  return transportationFollow[vehicle] || null;
}
