import type {
  CarFeatures,
  PedestrianFeatures,
  PolyFeatures,
} from '@/pages/geoMap/types';
import PedestrianPolylines from './PedestrianPolylines';
import CarPolylines from './CarPolylines';
import { useStore } from 'zustand';
import { useTransportation } from '@/pages/geoMap/store';

interface GetPolylinesProps {
  destination: PolyFeatures;
}

export default function GetPolylines({ destination }: GetPolylinesProps) {
  const { vehicle } = useStore(useTransportation);
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
