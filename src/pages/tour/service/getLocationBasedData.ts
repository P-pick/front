import { tourApi } from '@/config/instance';
import { NUM_OF_ROWS } from '@/pages/const/TOUR';
import type {
  ApiResponse,
  AroundContentTypeId,
  GeoTripLocation,
  TourItem,
} from '@/pages/types';

const getLocationBasedItems = async ({
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

export default getLocationBasedItems;
