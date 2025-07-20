/* eslint-disable react-hooks/rules-of-hooks */
import type {
  CarRequestBody,
  MultiplePathResponse,
  PedestrianRequestBody,
  TransportationType,
} from '../types';
import destinationQueries from './queryOptions';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import handleRedirectTransportation from './redirectTransportation';

const getTransportationSelected = (
  vehicle: TransportationType,
  destination: PedestrianRequestBody | CarRequestBody,
): MultiplePathResponse[] => {
  const selectedTransportation = {
    pedestrian: () =>
      useSuspenseQuery(
        destinationQueries.pedestrian(destination as PedestrianRequestBody),
      ).data,
    car: () =>
      useQuery(destinationQueries.car(destination as CarRequestBody)).data ||
      [],
    bicycle: () => {
      handleRedirectTransportation({
        start: {
          lat: destination.startY,
          lng: destination.startX,
        },
        end: {
          lat: destination.endY,
          lng: destination.endX,
        },
        vehicle: 'bicycle',
      });
      return [];
    },
    publictransit: () => [],
  };
  return selectedTransportation[vehicle]();
};

export default getTransportationSelected;
