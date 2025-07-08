/* eslint-disable react-hooks/rules-of-hooks */
import type {
  CarRequestBody,
  MultiplePathResponse,
  PedestrianRequestBody,
  TransportationType,
} from '../types';
import getCarDestinationQueryOptions from './getCarData';
import getPedestrianDestinationQueryOptions from './getPedestrianData';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

const getTransportationSelected = (
  vehicle: TransportationType,
  destination: PedestrianRequestBody | CarRequestBody
): MultiplePathResponse[] => {
  const selectedTransportation = {
    pedestrian: () =>
      useSuspenseQuery(getPedestrianDestinationQueryOptions(destination as PedestrianRequestBody)).data,
    car: () => useQuery(getCarDestinationQueryOptions(destination as CarRequestBody)).data || [],
    bicycle: () => useQuery(getCarDestinationQueryOptions(destination as CarRequestBody)).data || [],
    'public-transportation': () =>
     useQuery(getCarDestinationQueryOptions(destination as CarRequestBody)).data || [],
  };
  return selectedTransportation[vehicle]();
};

export default getTransportationSelected;
