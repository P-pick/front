import { tmapApi } from '@/shared';
import type {
  CarOptionNames,
  CarRequestBody,
  CarResponse,
  CarSearchOption,
  MultiplePathResponse,
} from '../types';

const SEARCH_OPTIONS = [
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

const getCarDestinationPathInfo = async (
  carRequest: CarRequestBody,
): Promise<CarResponse> => {
  const response = await tmapApi.post('/', {
    trafficInfo: 'Y',
    ...carRequest,
  });
  return response.data;
};

const getCarDestinationQueryOptions = (baseRequest: CarRequestBody) => ({
  queryKey: [
    'carDestination',
    baseRequest.startX,
    baseRequest.startY,
    baseRequest.endX,
    baseRequest.endY,
    baseRequest.startName,
    baseRequest.endName,
  ],
  queryFn: async (): Promise<MultiplePathResponse[]> => {
    const results = await Promise.allSettled(
      SEARCH_OPTIONS.map(searchOption =>
        getCarDestinationPathInfo({
          ...baseRequest,
          searchOption: searchOption.id as CarSearchOption,
        }).then(res => ({
          optionId: searchOption.id as CarSearchOption,
          name: searchOption.name as CarOptionNames,
          features: res.features,
        })),
      ),
    );

    return results
      .filter(result => result.status === 'fulfilled')
      .map(
        result =>
          (result as PromiseFulfilledResult<MultiplePathResponse>).value,
      );
  },
});

export default getCarDestinationQueryOptions;
