import { transportation } from '../lib';
import type { CarRequestBody, PedestrianRequestBody } from '../types';
import useCarDestination from './getCarData';
import usePedestrianDestination from './getPedestrianData';

const getTransportationSelected = (
  vehicle: 'pedestrian' | 'car',
  destination: PedestrianRequestBody | CarRequestBody
) => {
  const pedestrianDestination = usePedestrianDestination(
    destination as PedestrianRequestBody
  )?.features;
  const carDestination = useCarDestination(destination as CarRequestBody);

  const selectedTransportation = {
    pedestrian: transportation.Pedestrian(pedestrianDestination),
    car: transportation.Car(carDestination?.features),
  } as const;
  return selectedTransportation[vehicle];
};

export default getTransportationSelected;
