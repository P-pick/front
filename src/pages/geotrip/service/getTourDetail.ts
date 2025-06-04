import api from '@/config/instance';
import type {
  ApiResponse,
  TourDetail,
  TourDetailImage,
  TourDetailResponse,
} from '../types';
import { useQuery } from '@tanstack/react-query';

const getTourDetail = async (id?: number): Promise<TourDetailResponse> => {
  if (!id) return Promise.reject('투어 ID가 없습니다.');
  const response = await api.get<ApiResponse<TourDetail[]>>(`/detailCommon2`, {
    params: {
      contentId: id,
      _type: 'json',
    },
  });

  const response2 = await api.get<ApiResponse<TourDetailImage[]>>(
    `/detailImage2`,
    {
      params: {
        contentId: id,
        _type: 'json',
      },
    }
  );

  return {
    overview: response.data.response.body.items.item[0].overview,
    images: response2.data.response.body.items.item,
  };
};

const useTourDetailQuery = (id: number | undefined) => {
  return useQuery({
    queryKey: ['tourDetail', id],
    queryFn: () => getTourDetail(id),
    enabled: !!id,
  });
};

export default useTourDetailQuery;
