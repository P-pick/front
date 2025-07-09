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
import handleRedirectTransportation from './redirectTransportation';

const getTransportationSelected = (
  vehicle: TransportationType,
  destination: PedestrianRequestBody | CarRequestBody,
): MultiplePathResponse[] => {
  const selectedTransportation = {
    pedestrian: () =>
      useSuspenseQuery(
        getPedestrianDestinationQueryOptions(
          destination as PedestrianRequestBody,
        ),
      ).data,
    car: () =>
      useQuery(getCarDestinationQueryOptions(destination as CarRequestBody))
        .data || [],
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
    'public-transportation': () => {
      handleRedirectTransportation({
        start: {
          lat: destination.startY,
          lng: destination.startX,
        },
        end: {
          lat: destination.endY,
          lng: destination.endX,
        },
        vehicle: 'public-transportation',
      });
      return [];
    },
  };
  return selectedTransportation[vehicle]();
};

export default getTransportationSelected;
