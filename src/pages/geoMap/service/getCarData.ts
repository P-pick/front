import type { CarRequestBody, CarResponse } from '../types';
import axios from 'axios';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { TMAP_APP_KEY } from '@/pages/const/TMAP';

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

const useCarDestination = (destination: CarRequestBody) => {
  const { data } = useQuery({
    queryKey: [
      'carDestination',
      destination.startX,
      destination.startY,
      destination.endX,
      destination.endY,
      destination.startName,
      destination.endName,
    ],
    queryFn: () => getCarDestinationPathInfo(destination),
  });
  return data;
};

export default useCarDestination;
