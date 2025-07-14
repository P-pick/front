import { tmapApi } from '@/config/instance';
import type { TransitPlanResponse } from '../types';
import type { TransitRequestBody } from '../types/transitType';

const getTransitDestinationPathInfo = async (
  transitRequest: TransitRequestBody,
): Promise<TransitPlanResponse> => {
  const response = await tmapApi.post('/transit/routes', {
    ...transitRequest,
    format: 'json',
  });
  return response.data;
};

export default getTransitDestinationPathInfo;
