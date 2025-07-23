import { tourApi } from '@/shared';
import type {
  GetSelectedPinDetailRequest,
  GetSelectedPinDetailResponse,
} from '@/entities/aroundTourist';

const getSelectedPinDetail = async ({
  contentId,
  contentTypeId,
}: GetSelectedPinDetailRequest): GetSelectedPinDetailResponse => {
  const response = await tourApi.get('/detailCommon2', {
    params: {
      contentId,
      contentTypeId,
    },
  });
  return response.data.response.body;
};

export default getSelectedPinDetail;
