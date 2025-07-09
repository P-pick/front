import { tourApi } from '@/config/instance';
import type { ApiResponse, TourItem } from '@/pages/types';

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

  if (!items) {
    throw new Error(`콘텐츠 ID ${contentId}에 대한 상세 정보가 없습니다.`);
  }

  return items.item[0];
};

const getTourDetailQueryOptions = ({ contentId }: getTourDetailRequest) => ({
  queryKey: ['tourDetail', contentId],
  queryFn: () => getTourDetail({ contentId }),
});

export default getTourDetailQueryOptions;
