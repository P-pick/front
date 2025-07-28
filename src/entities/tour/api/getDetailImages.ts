import { tourApi } from '@/shared/config/axios';
import type { ApiResponse, TourDetailImage } from '../types';

export const getDetailImages = async (contentId: string) => {
  const params = { contentId };
  const imageRes = await tourApi.get<ApiResponse<TourDetailImage[]>>(
    `/detailImage2`,
    { params },
  );
  if (!imageRes.data.response.body.items) {
    return [];
  }

  return imageRes.data.response.body.items.item;
};
