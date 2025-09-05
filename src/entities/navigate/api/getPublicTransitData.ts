import { tmapApi } from '@/shared';

import type { PUBLICTRANSIT } from '@/entities/navigate';

const getTransitDestinationPathInfo = async (
  transitRequest: PUBLICTRANSIT.TransitRequestBody,
): Promise<PUBLICTRANSIT.TransitPlanResponse> => {
  const response = await tmapApi.post('/transit/routes', {
    ...transitRequest,
    format: 'json',
  });
  return response.data;
};

export default getTransitDestinationPathInfo;
