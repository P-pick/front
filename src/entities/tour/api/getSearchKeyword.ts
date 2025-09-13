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
  const response = await tourApi.get<ApiResponse<TourItem[]>>(
    `/searchKeyword2`,
    {
      params: {
        keyword,
        pageNo,
        arrange: 'A',
      },
    },
  );
  const responseBody = response.data.response.body;

  return responseBody;
};
