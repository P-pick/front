import api from '@/config/instance';
import type {
  AroundContentTypeId,
  GeoTripLocation,
  TourItem,
} from '@/pages/types';
import { useQuery } from '@tanstack/react-query';

export type LocationBasedItemRequest = {
  location: GeoTripLocation;
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
  contentTypeId,
}: LocationBasedItemRequest): LocationBasedItemResponse => {
  if (!location) return Promise.reject('위치 정보가 없습니다.');

  const response = await api.get(`/locationBasedList2`, {
    params: {
      mapX: location.lng,
      mapY: location.lat,
      arrange: 'E',
      radius: '3000',
      numOfRows: 30,
      contentTypeId,
      pageNo: 1,
    },
  });

  return response.data.response.body;
};

const useAroundTouristQuery = (
  destination: GeoTripLocation,
  contentTypeId: AroundContentTypeId
) => {
  const response = useQuery({
    queryKey: ['aroundTouristMapData', destination, contentTypeId],
    queryFn: () =>
      getAroundTouristMapData({ location: destination, contentTypeId }),
  });
  return response.data?.items.item || [];
};

export default useAroundTouristQuery;
