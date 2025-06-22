import type {
  CarFeatures,
  PedestrianFeatures,
  PolyFeatures,
  TransportationType,
} from '../types';
import getCarDestinationPath from './getPolyLinesCarPathInfo';
import getPedestrianDestinationPath from './getPolyLinesPedestrianPath';

const getSelectedTransportationPolylines = (
  vehicle: TransportationType,
  features: PolyFeatures
) => {
  const selectedTransportation = {
    pedestrian: () =>
      getPedestrianDestinationPath(features as PedestrianFeatures[]),
    car: () => getCarDestinationPath(features as CarFeatures[]),
    bicycle: () => getCarDestinationPath(features as CarFeatures[]),
    'public-transportation': () =>
      getCarDestinationPath(features as CarFeatures[]),
  };
  return selectedTransportation[vehicle]();
};

export default getSelectedTransportationPolylines;
