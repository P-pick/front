import { tourApi } from '@/shared';

import type { ApiResponse, TourItem } from '@/entities/tour';

interface GetSearchKeywordParams {
  keyword: string;
  pageNo: number;
}
export const getSearchKeyword = async ({
  keyword,
  pageNo,
}: GetSearchKeywordParams) => {
  const response = await tourApi.get<ApiResponse<TourItem[]>>(
    `/searchKeyword2`,
    {
      params: {
        keyword,
        pageNo,
      },
    },
  );

  if (!response.data.response.body.items.item) {
    throw new Error('아이템 데이터가 없습니다.');
  }

  return response.data.response.body;
};
