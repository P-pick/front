import type {
  CarFeatures,
  PedestrianFeatures,
  PolyFeatures,
  TransportationType,
} from '../types';
import getCarFollowList from './getCarFollowList';
import getPedestrianFollowList from './getPedestrianFollowList';

const getSelectedTransportationPolylines = (
  vehicle: TransportationType,
  features: PolyFeatures
) => {
  const selectedTransportation = {
    pedestrian: () => getPedestrianFollowList(features as PedestrianFeatures[]),
    car: () => getCarFollowList(features as CarFeatures[]),
    bicycle: () => getCarFollowList(features as CarFeatures[]),
    'public-transportation': () => getCarFollowList(features as CarFeatures[]),
  };
  return selectedTransportation[vehicle]();
};

export default getSelectedTransportationPolylines;
