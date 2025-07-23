import type {
  ApiResponse,
  AroundContentTypeId,
  GeoTripLocation,
  TourItem,
} from '@/pages/types';
import { tourApi } from '@/shared';

export type LocationBasedItemRequest = {
  location: GeoTripLocation;
  contentTypeId?: AroundContentTypeId;
};

const getAroundTouristMapData = async ({
  location,
  contentTypeId,
}: LocationBasedItemRequest): Promise<TourItem[]> => {
  if (!location) return Promise.reject('위치 정보가 없습니다.');

  const response = await tourApi.get<ApiResponse<TourItem[]>>(
    `/locationBasedList2`,
    {
      params: {
        mapX: location.lng,
        mapY: location.lat,
        arrange: 'E',
        radius: '3000',
        numOfRows: 30,
        contentTypeId,
        pageNo: 1,
      },
    },
  );

  return response.data.response.body.items.item;
};

const getAroundTouristQueryOptions = (
  destination: GeoTripLocation,
  contentTypeId: AroundContentTypeId,
) => ({
  queryKey: ['aroundTouristMapData', destination, contentTypeId],
  queryFn: () =>
    getAroundTouristMapData({ location: destination, contentTypeId }),
});

export default getAroundTouristQueryOptions;
