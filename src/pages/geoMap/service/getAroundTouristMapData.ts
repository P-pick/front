import api from '@/config/instance';
import { type GeoTripLocation, type TourItemWithDetail } from '@/pages/types';
import { useQuery } from '@tanstack/react-query';
import type { AroundContentTypeId } from '../types';

export type LocationBasedItemRequest = {
  location: GeoTripLocation | null;
  contentTypeId?: AroundContentTypeId;
};

type LocationBasedItemResponse = Promise<{
  items: {
    item: TourItemWithDetail[];
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

const useAroundTouristMapQuery = ({
  location,
  contentTypeId,
}: LocationBasedItemRequest) => {
  const { data } = useQuery({
    queryKey: [
      'aroundTouristMapData',
      location?.latitude,
      location?.longitude,
      contentTypeId,
    ],
    queryFn: () => getAroundTouristMapData({ location, contentTypeId }),
    enabled: !!location?.latitude && !!location?.longitude,
  });

  const aroundObjects = data?.items.item;
  return aroundObjects;
};

export default useAroundTouristMapQuery;
