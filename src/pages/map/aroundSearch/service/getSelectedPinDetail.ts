import type { TourItem } from '@/pages/types';
import type { AroundContentTypeId } from '../types';
import api from '@/config/instance';
import { useQuery } from '@tanstack/react-query';

type GetSelectedPinDetailRequest = {
  contentId: number;
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
  const response = await api.get('/detailInfo2', {
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
  return selectedPin.data;
};

export default useGetSelectedPinDetail;
