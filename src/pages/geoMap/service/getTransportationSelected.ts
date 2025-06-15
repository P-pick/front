import { transportation } from '../lib';
import type {
  CarRequestBody,
  PedestrianRequestBody,
  TransportationType,
} from '../types';
import useCarDestination from './getCarData';
import usePedestrianDestination from './getPedestrianData';

const getTransportationSelected = (
  vehicle: TransportationType,
  destination: PedestrianRequestBody | CarRequestBody
) => {
  const selectedTransportation = {
    pedestrian: () => {
      const pedestrianDestination = usePedestrianDestination(
        destination as PedestrianRequestBody
      )?.features;
      return transportation.Pedestrian(pedestrianDestination);
    },
    car: () => {
      const carDestination = useCarDestination(destination as CarRequestBody);
      return transportation.Car(carDestination?.features);
    },
    bicycle: () => {
      const carDestination = useCarDestination(destination as CarRequestBody);
      return transportation.Car(carDestination?.features);
    },
    'public-transportation': () => {
      const carDestination = useCarDestination(destination as CarRequestBody);
      return transportation.Car(carDestination?.features);
    },
  };
  return selectedTransportation[vehicle]();
};

export default getTransportationSelected;
