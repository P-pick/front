import axios from 'axios';
import type {
  MultiplePathResponse,
  PedestrianRequestBody,
  PedestrianResponse,
} from '../types';
import { TMAP_APP_KEY } from '@/pages/const/TMAP';

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
  pedestrianRequest: PedestrianRequestBody
): Promise<PedestrianResponse> => {
  const response = await axios.post(
    '/path/navigation/pedestrian',
    pedestrianRequest,
    {
      params: {
        version: '1',
        callback: 'function',
      },
      headers: {
        appKey: TMAP_APP_KEY,
      },
    }
  );
  return response.data;
};

const getPedestrianDestinationQueryOptions = (
  baseRequest: PedestrianRequestBody
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
  queryFn: async (): Promise<MultiplePathResponse[]> => {
    const results = await Promise.allSettled(
      SEARCH_OPTIONS.map(searchOption =>
        getPedestrianDestinationPathInfo({
          ...baseRequest,
          searchOption: searchOption.id,
        }).then(res => ({
          optionId: searchOption.id,
          name: searchOption.name,
          features: res.features,
        }))
      )
    );

    return results
      .filter(result => result.status === 'fulfilled')
      .map(
        result =>
          (result as PromiseFulfilledResult<MultiplePathResponse>).value
      );
  },
});

export default getPedestrianDestinationQueryOptions;
