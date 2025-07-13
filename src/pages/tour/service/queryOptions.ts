import type { ResponseBody, TourItem } from '@/pages/types';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import type { LocationBasedItemRequest } from '../types';
import { getDetailImages, getLocationBasedItems } from './';

const tourQueries = {
  locationBasedLists: () => ['locationBasedData'] as const,
  locationBasedList: (request: Omit<LocationBasedItemRequest, 'pageNo'>) =>
    infiniteQueryOptions({
      queryKey: [...tourQueries.locationBasedLists(), request],
      initialPageParam: 1,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        getLocationBasedItems({
          location: request.location,
          pageNo: pageParam,
          contentTypeId: request.contentTypeId,
          radius: request.radius,
        }),
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
};

export default tourQueries;
