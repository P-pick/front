import type { AroundContentTypeId, TourItem } from '@/pages/types';
import api from '@/config/instance';
import { useQuery } from '@tanstack/react-query';

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

const useGetSelectedPinDetail = ({
  contentId,
  contentTypeId,
}: GetSelectedPinDetailRequest) => {
  const selectedPin = useQuery({
    queryKey: ['selectedPinDetail', contentId, contentTypeId],
    queryFn: () => getSelectedPinDetail({ contentId, contentTypeId }),
  });
  return selectedPin.data?.items.item[0] || null;
};

export default useGetSelectedPinDetail;
