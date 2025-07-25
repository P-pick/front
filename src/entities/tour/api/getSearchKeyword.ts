import { tourApi } from '@/shared';

import type { ApiResponse, TourItem } from '@/entities/tour';

interface GetSearchKeywordParams {
  keyword?: string;
  pageNo: number;
}
export const getSearchKeyword = async ({
  keyword,
  pageNo,
}: GetSearchKeywordParams) => {
  if (!keyword) {
    throw new Error('검색어가 없습니다.');
  }
  const response = await tourApi.get<ApiResponse<TourItem[]>>(
    `/searchKeyword2`,
    {
      params: {
        keyword,
        pageNo,
      },
    },
  );

  return response.data.response.body;
};
