import { tourApi } from '@/config/instance';
import type { ApiResponse } from '@/pages/types';
import type { TourDetailImage } from '../types';

const getDetailImages = async (contentId: string) => {
  const params = { contentId };
  const imageRes = await tourApi.get<ApiResponse<TourDetailImage[]>>(
    `/detailImage2`,
    { params },
  );
  if (!imageRes.data.response.body.items.item) {
    throw new Error(`no images`);
  }

  return imageRes.data.response.body.items.item;
};

export default getDetailImages;
