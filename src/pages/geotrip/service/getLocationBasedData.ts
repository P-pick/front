import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/config/instance';
import useGeolocation from '../lib/useGeolocation';
import type { ApiResponse, Item, Location } from '../types';
const NUM_OF_ROWS = 30;

type GetLocationBasedDataParams = {
  location: Location | null;
  pageNo: number;
};

type LocationBasedItemResponse = Promise<{
  items: Item[];
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}>;

const getLocationBasedData = async ({
  location,
  pageNo,
}: GetLocationBasedDataParams): LocationBasedItemResponse => {
  if (!location) return Promise.reject('위치 정보가 없습니다.');
  const response = await api.get<ApiResponse>(`/locationBasedList2`, {
    params: {
      mapX: location.longitude,
      mapY: location.latitude,
      radius: '5000',
      contentTypeId: 12,
      numOfRows: NUM_OF_ROWS,
      pageNo,
    },
  });

  return {
    items: response.data.response.body.items.item,
    pageNo: response.data.response.body.pageNo,
    numOfRows: response.data.response.body.numOfRows,
    totalCount: response.data.response.body.totalCount,
  };
};

const useGetLocationBasedData = () => {
  const { location } = useGeolocation({
    enableHighAccuracy: true,
  });

  const query = useInfiniteQuery({
    queryKey: ['locationBasedData', location],
    enabled: !!location,
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

export default useGetLocationBasedData;
