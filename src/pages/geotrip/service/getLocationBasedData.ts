import api from '@/config/instance';
import useGeolocation from '../lib/useGeolocation';
import type { ApiResponse, Location } from '@/pages/geotrip/types';
import { useInfiniteQuery } from '@tanstack/react-query';

const NUM_OF_ROWS = 30;

type GetLocationBasedDataParams = {
  location: Location | null;
  pageNo: number;
};

const getLocationBasedData = async ({
  location,
  pageNo,
}: GetLocationBasedDataParams) => {
  if (!location) throw new Error('위치 정보가 유효하지 않습니다.');

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

  return response.data.response.body;
};

const useGetLocationBasedData = (pageNo: number) => {
  const { location } = useGeolocation({
    enableHighAccuracy: true,
  });

  const { data } = useInfiniteQuery({
    queryKey: ['locationBasedData', location],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (
        Math.ceil(lastPage.totalCount / lastPage.numOfRows) - lastPage.pageNo >
        0
      )
        return lastPage.pageNo + 1;
      return undefined;
    },
    queryFn: () => getLocationBasedData({ location, pageNo }),
    enabled: !!location,
  });

  return { data };
};

export default useGetLocationBasedData;
