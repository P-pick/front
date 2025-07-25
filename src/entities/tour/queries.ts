import type {
  AroundContentTypeId,
  ResponseBody,
  TourItem,
} from '@/pages/types';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import {
  getDetailImages,
  getLocationBasedItems,
  getSearchKeyword,
  getTourDetailCommon,
  getTourDetailIntro,
} from './api';
import type { LocationBasedInfiniteQueryParams } from './types';

export const tourQueries = {
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
  searchKeyWord: (keyword: string) =>
    infiniteQueryOptions({
      queryKey: ['searchKeyword', keyword],
      queryFn: ({ pageParam }: { pageParam: number }) =>
        getSearchKeyword({ keyword, pageNo: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ResponseBody<TourItem[]>) => {
        const currentPage = lastPage.pageNo;
        const totalPage = Math.ceil(lastPage.totalCount / lastPage.numOfRows);
        return currentPage < totalPage ? currentPage + 1 : undefined;
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
      queryFn: () => getTourDetailCommon({ contentId }), // Assuming '12' is a valid contentTypeId for common details
    }),
};
