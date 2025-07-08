import api from '@/config/instance';
import type {
  AroundContentTypeId,
  GeoTripLocation,
  TourItem,
} from '@/pages/types';

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

const getAroundTouristQueryOptions = (
  destination: GeoTripLocation,
  contentTypeId: AroundContentTypeId
) => ({
  queryKey: ['aroundTouristMapData', destination, contentTypeId],
  queryFn: () => getAroundTouristMapData({ location: destination, contentTypeId }),
});

export default getAroundTouristQueryOptions;
