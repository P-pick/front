import type { AroundContentTypeId, TourItem } from '@/pages/types';
import api from '@/config/instance';

type GetSelectedPinDetailRequest = {
  contentId: string | null;
  contentTypeId: AroundContentTypeId;
};

type GetSelectedPinDetailResponse = Promise<{
  items: {
    item: TourItem[];
  };
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}>;

const getSelectedPinDetail = async ({
  contentId,
  contentTypeId,
}: GetSelectedPinDetailRequest): GetSelectedPinDetailResponse => {
  const response = await api.get('/detailCommon2', {
    params: {
      contentId,
      contentTypeId,
    },
  });
  return response.data.response.body;
};

const getSelectedPinDetailQueryOptions = ({
  contentId,
  contentTypeId,
}: GetSelectedPinDetailRequest) => ({
  queryKey: ['selectedPinDetail', contentId, contentTypeId],
  queryFn: () => getSelectedPinDetail({ contentId, contentTypeId }),
});

export default getSelectedPinDetailQueryOptions;
