import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import api from '@/config/instance';
import type {
  ApiResponse,
  TourItem,
  TourDetailImage,
  TourItemWithDetail,
  GeoTripLocation,
  ResponseBody,
} from '@/pages/types';
import { NUM_OF_ROWS } from '@/pages/const/TOUR';
import type { AroundContentTypeId } from '@/pages/map/aroundSearch/types';

type LocationBasedItemRequest = {
  location: GeoTripLocation | null;
  pageNo: number;
  contentTypeId: AroundContentTypeId;
  radius?: string;
};

type LocationBasedItemResponse = Promise<{
  items: TourItemWithDetail[];
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}>;

const fetchDetailImages = async (contentId: number) => {
  const params = { contentId };
  const imageRes = await api.get<ApiResponse<TourDetailImage[]>>(
    `/detailImage2`,
    { params }
  );
  if (imageRes.data.response.body.items === '') {
    throw new Error(`no images`);
  }

  return imageRes.data.response.body.items.item;
};

const fetchLocationBasedItems = async (
  location: GeoTripLocation,
  pageNo: number,
  contentTypeId: AroundContentTypeId,
  radius: string
) => {
  const response = await api.get<ApiResponse<TourItem[]>>(
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
    }
  );

  if (response.data.response.body.items === '') {
    throw new Error('아이템 데이터가 없습니다.');
  }

  return response.data.response.body as Omit<
    ResponseBody<TourItem[]>,
    'items'
  > & { items: { item: TourItem[] } };
};

const attachDetailImages = async (
  baseItems: TourItem[]
): Promise<TourItemWithDetail[]> => {
  const settledResults = await Promise.allSettled(
    baseItems.map(async (item, index) => {
      const firstImage: TourDetailImage = {
        imgname: item.firstimage,
        originimgurl: item.firstimage,
        serialnum: item.firstimage + String(index),
      };
      try {
        const imageArray = await fetchDetailImages(item.contentid);

        return { ...item, images: imageArray };
      } catch (error) {
        if (error instanceof Error && error.message === 'no images') {
          return { ...item, images: [firstImage] };
        }
      }
    })
  );

  return settledResults
    .filter(r => r.status === 'fulfilled' && r.value !== null)
    .map(r => (r as PromiseFulfilledResult<TourItemWithDetail>).value);
};

const getLocationBasedData = async ({
  location,
  pageNo,
  contentTypeId = '12',
  radius = '5000',
}: LocationBasedItemRequest): LocationBasedItemResponse => {
  if (!location) throw new Error('위치 정보가 없습니다.');

  const body = await fetchLocationBasedItems(
    location,
    pageNo,
    contentTypeId,
    radius
  );

  const baseItems = body.items.item;

  const itemsWithDetail = await attachDetailImages(baseItems);

  return {
    items: itemsWithDetail,
    pageNo: body.pageNo,
    numOfRows: body.numOfRows,
    totalCount: body.totalCount,
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
