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
}: LocationBasedItemRequest): LocationBasedItemResponse => {
  if (!location) return Promise.reject('위치 정보가 없습니다.');

  const response = await api.get<ApiResponse<TourItem[]>>(
    `/locationBasedList2`,
    {
      params: {
        mapX: location.longitude,
        mapY: location.latitude,
        radius: '5000',
        contentTypeId: 12,
        numOfRows: NUM_OF_ROWS,
        pageNo,
        _type: 'json',
      },
    }
  );

  const baseItems = response.data.response.body.items.item;
  const itemsWithDetail = await Promise.all(
    baseItems.map(async item => {
      const params = { contentId: item.contentid, _type: 'json' };
      const [commonRes, imageRes] = await Promise.all([
        api.get<ApiResponse<{ overview: string }[]>>(`/detailCommon2`, {
          params,
        }),
        api.get<ApiResponse<TourDetailImage[]>>(`/detailImage2`, { params }),
      ]);

      return {
        ...item,
        overview: commonRes.data.response.body.items.item[0]?.overview ?? '',
        images: imageRes.data.response.body.items.item ?? [],
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

const useGeoLocationBasedTourQuery = (location: GeoTripLocation | null) => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ['locationBasedData', location],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getLocationBasedData({ location, pageNo: pageParam }),
    getNextPageParam: lastPage => {
      const currentPage = lastPage.pageNo;
      const totalPage = Math.ceil(lastPage.totalCount / lastPage.numOfRows);
      return currentPage < totalPage ? currentPage + 1 : undefined;
    },
  });

  return query;
};

export default { useGeoLocationBasedTourQuery };
