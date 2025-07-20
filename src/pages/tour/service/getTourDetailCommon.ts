import { tourApi } from '@/config/instance';
import type { ApiResponse, TourItem } from '@/pages/types';

type getTourDetailRequest = {
  contentId: string | null;
};

interface TourDetail extends TourItem {
  overview: string;
}

const getTourDetailCommon = async ({
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

export default getTourDetailCommon;
