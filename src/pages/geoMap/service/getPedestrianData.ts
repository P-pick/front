import axios from 'axios';
import type { PedestrianRequestBody, PedestrianResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import { TMAP_APP_KEY } from '../const/TMAP';

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

const usePedestrianDestination = (destination: PedestrianRequestBody) => {
  //GuDoYoon 내 위치 정보 가져오기 hook으로 교체 예정

  const { data } = useQuery({
    queryKey: [
      'pedestrianDestination',
      destination.startX,
      destination.startY,
      destination.endX,
      destination.endY,
      destination.startName,
      destination.endName,
    ],
    queryFn: () => getPedestrianDestinationPathInfo(destination),
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

export default usePedestrianDestination;
