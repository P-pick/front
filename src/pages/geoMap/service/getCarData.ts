import type { CarRequestBody, CarResponse } from '../types';
import { TMAP_APP_KEY } from '../const/TMAP';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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
    enabled:
      !!destination.startX &&
      !!destination.startY &&
      !!destination.endX &&
      !!destination.endY &&
      !!destination.startName &&
      !!destination.endName,
    refetchOnWindowFocus: false,
  });
  return data;
};

export default useCarDestination;
