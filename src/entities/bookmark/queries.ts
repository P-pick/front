import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { getBookmark, getBookmarkList } from '@/entities/bookmark';

import type { GetBookmarkRequest } from '@/entities/bookmark';

export const bookmarkOptions = {
  getBookmark: ({ userId, contentId }: GetBookmarkRequest) =>
    queryOptions({
      queryKey: ['bookmark', userId, contentId],
      queryFn: () => getBookmark({ userId, contentId }),
    }),
  getBookmarkList: ({ userId }: Pick<GetBookmarkRequest, 'userId'>) =>
    infiniteQueryOptions({
      queryKey: ['bookmarkList', userId],
      queryFn: ({ pageParam }: { pageParam: number | null | undefined }) =>
        getBookmarkList({ userId, pageParam }),
      initialPageParam: null,
      getNextPageParam: lastPage => lastPage?.nextCursor || undefined,
    }),
};
