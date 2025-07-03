/* eslint-disable react-hooks/rules-of-hooks */
import type {
  CarRequestBody,
  MultiplePathResponse,
  PedestrianRequestBody,
  TransportationType,
} from '../types';
import useCarDestination from './getCarData';
import usePedestrianDestination from './getPedestrianData';

const getTransportationSelected = (
  vehicle: TransportationType,
  destination: PedestrianRequestBody | CarRequestBody
): MultiplePathResponse[] => {
  const selectedTransportation = {
    pedestrian: () =>
      usePedestrianDestination(destination as PedestrianRequestBody),
    car: () => useCarDestination(destination as CarRequestBody),
    bicycle: () => useCarDestination(destination as CarRequestBody),
    'public-transportation': () =>
      useCarDestination(destination as CarRequestBody),
  };
  return selectedTransportation[vehicle]();
};

export default getTransportationSelected;
