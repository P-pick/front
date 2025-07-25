import {
  getCarDestinationPathInfo,
  getPedestrianDestinationPathInfo,
} from './api';
import getTransitDestinationPathInfo from './api/getPublicTransitData';
import type { CAR, PEDESTRIAN, PUBLICTRANSIT } from '@/entities/navigate';

const CAR_SEARCH_OPTIONS = [
  {
    id: 0,
    name: '추천도로',
  },
  {
    id: 1,
    name: '무료우선',
  },
  {
    id: 2,
    name: '최소시간',
  },
  {
    id: 3,
    name: '초보운전',
  },
  {
    id: 4,
    name: '고속도로우선',
  },
  {
    id: 10,
    name: '최단거리 + 유/무료',
  },
  {
    id: 12,
    name: '이륜차도로우선',
  },
  {
    id: 19,
    name: '어린이보호구역 회피',
  },
] as const;

const PEDESTRAIN_SEARCH_OPTIONS = [
  {
    id: 0,
    name: '추천',
  },
  {
    id: 4,
    name: '추천 + 대로우선',
  },
  {
    id: 10,
    name: '최단거리',
  },
  {
    id: 30,
    name: '최단거리 + 계단제외',
  },
] as const;

const getPathResultFulfilled = <T>(results: PromiseSettledResult<T>[]) => {
  return results
    .filter(result => result.status === 'fulfilled')
    .map(result => (result as PromiseFulfilledResult<T>).value);
};

const getCarDestinationQueryOptions = (baseRequest: CAR.CarRequestBody) => ({
  queryKey: [
    'carDestination',
    baseRequest.startX,
    baseRequest.startY,
    baseRequest.endX,
    baseRequest.endY,
    baseRequest.startName,
    baseRequest.endName,
  ],
  queryFn: async (): Promise<CAR.CarMultiplePathResponse[]> => {
    const results = await Promise.allSettled(
      CAR_SEARCH_OPTIONS.map(searchOption =>
        getCarDestinationPathInfo({
          ...baseRequest,
          searchOption: searchOption.id,
        }).then(res => ({
          optionId: searchOption.id,
          name: searchOption.name,
          features: res.features,
        })),
      ),
    );

    return getPathResultFulfilled(results);
  },
});

const getPedestrianDestinationQueryOptions = (
  baseRequest: PEDESTRIAN.PedestrianRequestBody,
) => ({
  queryKey: [
    'pedestrianDestination',
    baseRequest.startX,
    baseRequest.startY,
    baseRequest.endX,
    baseRequest.endY,
    baseRequest.startName,
    baseRequest.endName,
  ],
  queryFn: async (): Promise<PEDESTRIAN.PedestrianMultiplePathResponse[]> => {
    const results = await Promise.allSettled(
      PEDESTRAIN_SEARCH_OPTIONS.map(searchOption =>
        getPedestrianDestinationPathInfo({
          ...baseRequest,
          searchOption: searchOption.id,
        }).then(res => ({
          optionId: searchOption.id,
          name: searchOption.name,
          features: res.features,
        })),
      ),
    );

    return getPathResultFulfilled(results);
  },
});

const getTransitDestinationQueryOptions = (
  transitRequest: PUBLICTRANSIT.TransitRequestBody,
) => ({
  queryKey: [
    'transitDestination',
    transitRequest.startX,
    transitRequest.startY,
    transitRequest.endX,
    transitRequest.endY,
  ],
  queryFn: () => getTransitDestinationPathInfo(transitRequest),
  //캐싱 무한
  cacheTime: Infinity,
  refetchOnReconnect: false,
  staleTime: Infinity,
  gcTime: Infinity,
});

export const destinationQueries = {
  car: getCarDestinationQueryOptions,
  pedestrian: getPedestrianDestinationQueryOptions,
  transit: getTransitDestinationQueryOptions,
};
