import { tourApi } from '@/config/instance';
import type { ApiResponse, AroundContentTypeId } from '@/pages/types';

type getTourDetailInfoRequest = {
  contentId: string | null;
  contentTypeId: AroundContentTypeId;
};

interface getTourDetailInfoResponse {
  playtime: string;
  usetimeculture: string;
  usetime: string;
}

const getTourDetailInfo = async ({
  contentId,
  contentTypeId,
}: getTourDetailInfoRequest): Promise<getTourDetailInfoResponse> => {
  const response = await tourApi.get<ApiResponse<getTourDetailInfoResponse[]>>(
    '/detailIntro2',
    {
      params: { contentId, contentTypeId },
    },
  );
  const items = response.data.response.body.items;

  if (!items) {
    throw new Error('아이템 데이터가 없습니다.');
  }

  return items.item[0];
};

export default getTourDetailInfo;
