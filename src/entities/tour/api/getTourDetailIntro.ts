import { tourApi } from '@/shared';

import type {
  ApiResponse,
  AroundContentTypeId,
  DetailIntroResponse,
} from '@/entities/tour';

type getTourDetailIntroRequest = {
  contentId: string | null;
  contentTypeId: AroundContentTypeId;
};

type getTourDetailIntroResponse = DetailIntroResponse;
export const getTourDetailIntro = async ({
  contentId,
  contentTypeId,
}: getTourDetailIntroRequest): Promise<getTourDetailIntroResponse> => {
  const response = await tourApi.get<ApiResponse<getTourDetailIntroResponse[]>>(
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
