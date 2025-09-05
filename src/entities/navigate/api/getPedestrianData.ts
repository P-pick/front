import { tmapApi } from '@/shared';
import type { PEDESTRIAN } from '../types';

const getPedestrianDestinationPathInfo = async (
  pedestrianRequest: PEDESTRIAN.PedestrianRequestBody,
): Promise<PEDESTRIAN.PedestrianResponse> => {
  const response = await tmapApi.post(
    '/tmap/routes/pedestrian',
    pedestrianRequest,
  );
  return response.data;
};

export default getPedestrianDestinationPathInfo;
