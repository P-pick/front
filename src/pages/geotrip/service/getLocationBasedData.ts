import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import api from '@/config/instance';
import type {
  ApiResponse,
  TourItem,
  TourDetailImage,
  TourItemWithDetail,
  GeoTripLocation,
} from '@/pages/types';
import { NUM_OF_ROWS } from '@/pages/const/TOUR';

type LocationBasedItemRequest = {
  location: GeoTripLocation | null;
  pageNo: number;
  contentTypeId?: number;
  radius?: string;
};

type LocationBasedItemResponse = Promise<{
  items: TourItemWithDetail[];
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}>;

const getLocationBasedData = async ({
  location,
  pageNo,
  contentTypeId = 12,
  radius = '5000',
}: LocationBasedItemRequest): LocationBasedItemResponse => {
  if (!location) return Promise.reject('위치 정보가 없습니다.');

  const response = await api.get<ApiResponse<TourItem[]>>(
    `/locationBasedList2`,
    {
      params: {
        mapX: location.lng,
        mapY: location.lat,
        radius,
        contentTypeId,
        numOfRows: NUM_OF_ROWS,
        arrange: 'S',
        pageNo,
      },
    }
  );
  if (!response.data.response.body.items) {
    return Promise.reject('위치 기반 데이터가 없습니다.');
  }

  const baseItems = response.data.response.body.items.item;
  const itemsWithDetail = await Promise.all(
    baseItems.map(async (item, index) => {
      const params = { contentId: item.contentid, _type: 'json' };
      const [commonRes, imageRes] = await Promise.all([
        api.get<ApiResponse<{ overview: string }[]>>(`/detailCommon2`, {
          params,
        }),
        api.get<ApiResponse<TourDetailImage[]>>(`/detailImage2`, { params }),
      ]);

      const firstImage: TourDetailImage = {
        imgname: baseItems[index].firstimage,
        originimgurl: baseItems[index].firstimage,
        serialnum: String(index),
      };

      const images = imageRes.data.response.body.items.item
        ? [...imageRes.data.response.body.items.item]
        : [firstImage];

      return {
        ...item,
        overview: commonRes.data.response.body.items.item[0]?.overview ?? '',
        images,
      };
    })
  );

  return {
    items: itemsWithDetail,
    pageNo: response.data.response.body.pageNo,
    numOfRows: response.data.response.body.numOfRows,
    totalCount: response.data.response.body.totalCount,
  };
};

const useGeoLocationBasedTourQuery = (
  request: Omit<LocationBasedItemRequest, 'pageNo'>
) => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ['locationBasedData', request],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getLocationBasedData({
        location: request.location,
        pageNo: pageParam,
        contentTypeId: request.contentTypeId,
        radius: request.radius,
      }),
    getNextPageParam: lastPage => {
      const currentPage = lastPage.pageNo;
      const totalPage = Math.ceil(lastPage.totalCount / lastPage.numOfRows);
      return currentPage < totalPage ? currentPage + 1 : undefined;
    },
  });

  return query;
};

export default useGeoLocationBasedTourQuery;
