import axios from 'axios';
import type {
  MultiplePathResponse,
  PedestrianRequestBody,
  PedestrianResponse,
} from '../types';
import { useSuspenseQuery } from '@tanstack/react-query';
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

const usePedestrianDestination = (
  baseRequest: PedestrianRequestBody
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
    queryFn: () =>
      Promise.all(
        SEARCH_OPTIONS.map(async searchOption => {
          const res = await getPedestrianDestinationPathInfo({
            ...baseRequest,
            searchOption: searchOption.id,
          });
          return {
            optionId: searchOption.id,
            name: searchOption.name,
            features: res.features,
          };
        })
      ),
  });
  return data;
};

export default usePedestrianDestination;
