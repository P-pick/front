import type {
  CarRequestBody,
  PedestrianRequestBody,
  PolyFeatures,
  TransportationType,
} from '../types';
import useCarDestination from './getCarData';
import usePedestrianDestination from './getPedestrianData';

const getTransportationSelected = (
  vehicle: TransportationType,
  destination: PedestrianRequestBody | CarRequestBody
): PolyFeatures => {
  const selectedTransportation = {
    pedestrian: () =>
      usePedestrianDestination(destination as PedestrianRequestBody)?.features,
    car: () => useCarDestination(destination as CarRequestBody)?.features,
    bicycle: () => useCarDestination(destination as CarRequestBody)?.features,
    'public-transportation': () =>
      useCarDestination(destination as CarRequestBody)?.features,
  };
  return selectedTransportation[vehicle]();
};

export default getTransportationSelected;
