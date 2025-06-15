import { transportation } from '..';
import type {
  CarFeatures,
  PedestrianFeatures,
  PolyFeatures,
  TransportationType,
} from '../../types';

const getSelectedTransportationPolylines = (
  vehicle: TransportationType,
  features: PolyFeatures
) => {
  const selectedTransportation = {
    pedestrian: () =>
      transportation.Pedestrian(features as PedestrianFeatures[]),
    car: () => transportation.Car(features as CarFeatures[]),
    bicycle: () => transportation.Car(features as CarFeatures[]),
    'public-transportation': () =>
      transportation.Car(features as CarFeatures[]),
  };
  return selectedTransportation[vehicle]();
};

export default getSelectedTransportationPolylines;
