import { transportation } from '../lib';
import type { CarRequestBody, PedestrianRequestBody } from '../types';
import useCarDestination from './getCarData';
import usePedestrianDestination from './getPedestrianData';

const getTransportationSelected = (
  vehicle: 'pedestrian' | 'car',
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
  };
  return selectedTransportation[vehicle]();
};

export default getTransportationSelected;
