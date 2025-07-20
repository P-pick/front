import getTourDetail from '@/pages/tour/service/getTourDetailCommon';
import type {
  AroundContentTypeId,
  ResponseBody,
  TourItem,
} from '@/pages/types';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import type { LocationBasedInfiniteQueryParams } from '../types';
import { getDetailImages, getLocationBasedItems, getTourDetailIntro } from './';

const tourQueries = {
  locationBasedLists: () => ['locationBasedData'] as const,
  locationBasedList: ({
    location,
    radius,
    contentTypeId,
    initialPageParam = 1,
  }: LocationBasedInfiniteQueryParams) =>
    infiniteQueryOptions({
      queryKey: [
        ...tourQueries.locationBasedLists(),
        { location, radius, contentTypeId },
      ],
      initialPageParam,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        getLocationBasedItems({
          location,
          pageNo: pageParam,
          contentTypeId,
          radius,
        }),
      getNextPageParam: (lastPage: ResponseBody<TourItem[]>) => {
        const currentPage = lastPage.pageNo;
        const totalPage = Math.ceil(lastPage.totalCount / lastPage.numOfRows);
        return currentPage < totalPage ? currentPage + 1 : undefined;
      },
      getPreviousPageParam: (firstPage: ResponseBody<TourItem[]>) => {
        const currentPage = firstPage.pageNo;
        return currentPage === 1 ? undefined : currentPage - 1;
      },
    }),
  detail: (contentId: string) =>
    [...tourQueries.locationBasedLists(), 'detail', contentId] as const,
  detailImages: (contentId: string) =>
    queryOptions({
      queryKey: [...tourQueries.detail(contentId), 'images'],
      queryFn: () => getDetailImages(contentId),
    }),
  detailIntro: (contentId: string, contentTypeId: AroundContentTypeId) =>
    queryOptions({
      queryKey: [...tourQueries.detail(contentId), 'info', contentTypeId],
      queryFn: () => getTourDetailIntro({ contentId, contentTypeId }),
    }),
  detailCommon: (contentId: string) =>
    queryOptions({
      queryKey: [...tourQueries.detail(contentId), 'common'],
      queryFn: () => getTourDetail({ contentId }), // Assuming '12' is a valid contentTypeId for common details
    }),
};

export default tourQueries;
