import { tmapApi } from '@/shared';
import type { CAR } from '../types';

const getCarDestinationPathInfo = async (
  carRequest: CAR.CarRequestBody,
): Promise<CAR.CarResponse> => {
  const response = await tmapApi.post('/tmap/routes', {
    trafficInfo: 'Y',
    ...carRequest,
  });
  return response.data;
};

export default getCarDestinationPathInfo;
