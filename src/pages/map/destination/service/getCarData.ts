import { tmapApi } from '@/shared';
import type { CarRequestBody, CarResponse } from '../types';

const getCarDestinationPathInfo = async (
  carRequest: CarRequestBody,
): Promise<CarResponse> => {
  const response = await tmapApi.post('/tmap/routes', {
    trafficInfo: 'Y',
    ...carRequest,
  });
  return response.data;
};

export default getCarDestinationPathInfo;
