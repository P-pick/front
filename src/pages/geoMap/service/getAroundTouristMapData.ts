import api from '@/config/instance';
import { type GeoTripLocation, type TourItem } from '@/pages/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AroundContentTypeId } from '../types';

export type LocationBasedItemRequest = {
  location: GeoTripLocation | null;
  contentTypeId?: AroundContentTypeId;
};

type LocationBasedItemResponse = Promise<{
  items: {
    item: TourItem[];
  };
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}>;

const getAroundTouristMapData = async ({
  location,
  contentTypeId = '12',
}: LocationBasedItemRequest): LocationBasedItemResponse => {
  if (!location) return Promise.reject('위치 정보가 없습니다.');

  const response = await api.get(`/locationBasedList2`, {
    params: {
      mapX: location.longitude,
      mapY: location.latitude,
      arrange: 'E',
      radius: '5000',
      numOfRows: 30,
      contentTypeId,
      pageNo: 1,
    },
  });

  return response.data.response.body;
};

const useAroundTouristMapMutation = ({
  location,
  contentTypeId,
}: LocationBasedItemRequest) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getAroundTouristMapData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'aroundTouristMapData',
          location?.latitude,
          location?.longitude,
          contentTypeId,
        ],
      });
    },
    onError: error => {
      console.error('맵 데이터 가져오기 실패', error);
    },
  });
};

export default useAroundTouristMapMutation;
