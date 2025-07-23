import { tmapApi } from '@/shared';

import type {
  TransitPlanResponse,
  TransitRequestBody,
} from '../publicTransit/type';

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
