import { tourApi } from '@/shared';
import type { ApiResponse, TourDetailCommon } from '@/entities/tour';

type getTourDetailRequest = {
  contentId: string | null;
};

export const getTourDetailCommon = async ({
  contentId,
}: getTourDetailRequest): Promise<TourDetailCommon> => {
  const response = await tourApi.get<ApiResponse<TourDetailCommon[]>>(
    'detailCommon2',
    {
      params: { contentId },
    },
  );
  const items = response.data.response.body.items;

  if (!items) {
    throw new Error(`데이터가 없습니다.`);
  }

  return items.item[0];
};
