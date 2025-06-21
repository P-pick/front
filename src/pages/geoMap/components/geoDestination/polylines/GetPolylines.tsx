import type {
  CarFeatures,
  CarSearchOption,
  PedestrianFeatures,
  PedestrianSearchOption,
  PolyFeatures,
} from '@/pages/geoMap/types';
import PedestrianPolylines from './PedestrianPolylines';
import CarPolylines from './CarPolylines';
import { useStore } from 'zustand';
import { useTransportation } from '@/pages/geoMap/store';

interface GetPolylinesProps {
  destination: PolyFeatures;
  searchOption: PedestrianSearchOption | CarSearchOption;
}

export default function GetPolylines({
  destination,
  searchOption,
}: GetPolylinesProps) {
  const { vehicle } = useStore(useTransportation);
  const transportation = {
    pedestrian: (
      <PedestrianPolylines
        destination={destination as PedestrianFeatures[]}
        searchOption={searchOption as PedestrianSearchOption}
      />
    ),
    car: (
      <CarPolylines
        destination={destination as CarFeatures[]}
        searchOption={searchOption as CarSearchOption}
      />
    ),
    bicycle: (
      <CarPolylines
        destination={destination as CarFeatures[]}
        searchOption={searchOption as CarSearchOption}
      />
    ),
    'public-transportation': (
      <CarPolylines
        destination={destination as CarFeatures[]}
        searchOption={searchOption as CarSearchOption}
      />
    ),
  } as const;
  return transportation[vehicle];
}
