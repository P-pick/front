import { tmapApi } from '@/shared';
import type { PedestrianRequestBody, PedestrianResponse } from '../types';

const getPedestrianDestinationPathInfo = async (
  pedestrianRequest: PedestrianRequestBody,
): Promise<PedestrianResponse> => {
  const response = await tmapApi.post(
    '/tmap/routes/pedestrian',
    pedestrianRequest,
  );
  return response.data;
};

export default getPedestrianDestinationPathInfo;
