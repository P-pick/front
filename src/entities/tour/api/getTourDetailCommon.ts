import { tourApi } from '@/shared';
import type { ApiResponse, TourItem } from '../';

type getTourDetailRequest = {
  contentId: string | null;
};

interface TourDetail extends TourItem {
  overview: string;
}

export const getTourDetailCommon = async ({
  contentId,
}: getTourDetailRequest): Promise<TourDetail> => {
  const response = await tourApi.get<ApiResponse<TourDetail[]>>(
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
