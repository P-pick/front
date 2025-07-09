import type {
  CarFeatures,
  CarFollowFeature,
  PedestrianFeatures,
  PedestrianFollowFeature,
  PolyFeatures,
  TransportationType,
} from '../types';
import getCarFollowList from './getCarFollowList';
import getPedestrianFollowList from './getPedestrianFollowList';

const getSelectedTransportationFollow = (
  vehicle: TransportationType,
  features: PolyFeatures,
): CarFollowFeature[] | PedestrianFollowFeature[] => {
  const selectedTransportation = {
    pedestrian: () => getPedestrianFollowList(features as PedestrianFeatures[]),
    car: () => getCarFollowList(features as CarFeatures[]),
    bicycle: () => getCarFollowList(features as CarFeatures[]),
    publictransit: () => getCarFollowList(features as CarFeatures[]),
  };
  return selectedTransportation[vehicle]();
};

export default getSelectedTransportationFollow;
