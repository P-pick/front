/* eslint-disable react-hooks/rules-of-hooks */
import { href } from 'react-router-dom';
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
      window.location.href = href(
        'http://m.map.kakao.com/scheme/route?sp=37.40205,127.10821&vp=37.39424,127.11030&ep=37.39529,127.11044&by=bicycle',
      );
      return [];
    },
    'public-transportation': () => {
      window.location.href = href(
        'http://m.map.kakao.com/scheme/route?sp=37.40205,127.10821&vp=37.39424,127.11030&ep=37.39529,127.11044&by=publictransit',
      );
      return [];
    },
  };
  return selectedTransportation[vehicle]();
};

export default getTransportationSelected;
