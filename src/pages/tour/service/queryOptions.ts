import type { ResponseBody, TourItem } from '@/pages/types';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import type { LocationBasedInfiniteQueryParams } from '../types';
import { getDetailImages, getLocationBasedItems } from './';

const tourQueries = {
  locationBasedLists: () => ['locationBasedData'] as const,
  locationBasedList: ({
    location,
    radius,
    contentTypeId,
  }: LocationBasedInfiniteQueryParams) =>
    infiniteQueryOptions({
      queryKey: [
        ...tourQueries.locationBasedLists(),
        { location, radius, contentTypeId },
      ],
      initialPageParam: 10,
      queryFn: ({ pageParam }) =>
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

        return currentPage > 1 ? currentPage - 1 : undefined;
      },
    }),
  detail: (contentId: string) =>
    [...tourQueries.locationBasedLists(), 'detail', contentId] as const,
  detailImages: (contentId: string) =>
    queryOptions({
      queryKey: [...tourQueries.detail(contentId), 'images'],
      queryFn: () => getDetailImages(contentId),
    }),
};

export default tourQueries;
