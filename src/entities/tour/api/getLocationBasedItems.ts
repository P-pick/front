import type { GeoTripLocation } from '@/shared';
import { tourApi } from '@/shared';
import type { ApiResponse, AroundContentTypeId, TourItem } from '../';
import { NUM_OF_ROWS } from '../';

export const getLocationBasedItems = async ({
  location,
  pageNo,
  contentTypeId,
  radius = '200000',
}: {
  location: GeoTripLocation;
  pageNo: number;
  contentTypeId: AroundContentTypeId;
  radius: string;
}) => {
  const response = await tourApi.get<ApiResponse<TourItem[]>>(
    `/locationBasedList2`,
    {
      params: {
        mapX: location.lng,
        mapY: location.lat,
        radius,
        contentTypeId: Number(contentTypeId),
        numOfRows: NUM_OF_ROWS,
        arrange: 'S',
        pageNo,
      },
    },
  );

  if (!response.data.response.body.items.item) {
    throw new Error('아이템 데이터가 없습니다.');
  }

  return response.data.response.body;
};
