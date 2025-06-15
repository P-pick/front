import { transportation } from '..';
import type {
  CarPathFeature,
  PedestrianFeature,
  PolyFeatures,
  TransportationType,
} from '../../types';

const getSelectedTransportationPolylines = (
  vehicle: TransportationType,
  features: PolyFeatures
) => {
  const selectedTransportation = {
    pedestrian: transportation.Pedestrian(features as PedestrianFeature[]),
    car: transportation.Car(features as CarPathFeature[]),
    bicycle: transportation.Car(features as CarPathFeature[]),
    'public-transportation': transportation.Car(features as CarPathFeature[]),
  };
  return selectedTransportation[vehicle];
};

export default getSelectedTransportationPolylines;
