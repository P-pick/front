import type {
  MultiplePathResponse,
  PedestrianRequestBody,
  PedestrianResponse,
} from '../types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { tmapApi } from '@/config/instance';

const SEARCH_OPTIONS = [
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

const getPedestrianDestinationPathInfo = async (
  pedestrianRequest: PedestrianRequestBody,
): Promise<PedestrianResponse> => {
  const response = await tmapApi.post('/pedestrian', pedestrianRequest);
  return response.data;
};

const usePedestrianDestination = (
  baseRequest: PedestrianRequestBody,
): MultiplePathResponse[] => {
  const { data } = useSuspenseQuery({
    queryKey: [
      'pedestrianDestination',
      baseRequest.startX,
      baseRequest.startY,
      baseRequest.endX,
      baseRequest.endY,
      baseRequest.startName,
      baseRequest.endName,
    ],
    queryFn: async () => {
      const results = await Promise.allSettled(
        SEARCH_OPTIONS.map(searchOption =>
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

      return results
        .filter(result => result.status === 'fulfilled')
        .map(
          result =>
            (result as PromiseFulfilledResult<MultiplePathResponse>).value,
        );
    },
  });

  return data;
};

export default usePedestrianDestination;
