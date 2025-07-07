import { tourApi } from '@/config/instance';
import type { ApiResponse, TourItem } from '@/pages/types';
import { useSuspenseQuery } from '@tanstack/react-query';

type getTourDetailRequest = {
  contentId: string | null;
};

interface TourDetail extends TourItem {
  overview: string;
}

const getTourDetail = async ({
  contentId,
}: getTourDetailRequest): Promise<TourDetail> => {
  if (!contentId) return Promise.reject('콘텐츠 ID가 없습니다.');

  const response = await tourApi.get<ApiResponse<TourDetail[]>>(
    'detailCommon2',
    {
      params: { contentId },
    },
  );
  const items = response.data.response.body.items;

  return items.item[0] || Promise.reject('해당 콘텐츠를 찾을 수 없습니다.');
};

const useGetTourDetailSuspenseQuery = ({ contentId }: getTourDetailRequest) => {
  return useSuspenseQuery({
    queryKey: ['tourDetail', contentId],
    queryFn: () => getTourDetail({ contentId }),
  });
};

export default useGetTourDetailSuspenseQuery;
