import type { CarRequestBody, CarResponse } from '../types';
import axios from 'axios';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { TMAP_APP_KEY } from '@/pages/const/TMAP';

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
  carRequest: CarRequestBody
): Promise<CarResponse> => {
  const response = await axios.post(
    '/path/navigation',
    { trafficInfo: 'Y', ...carRequest },
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

const useCarDestination = (baseRequest: CarRequestBody) => {
  const { data } = useQuery({
    queryKey: [
      'carDestination',
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
          const res = await getCarDestinationPathInfo({
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

export default useCarDestination;
