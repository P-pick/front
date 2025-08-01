import { queryOptions } from '@tanstack/react-query';

import { getBookmark } from '@/entities/bookmark';

import { type GetBookmarkRequest } from '@/entities/bookmark';
export const bookmarkOptions = {
  getBookmark: ({ userId, contentId }: GetBookmarkRequest) =>
    queryOptions({
      queryKey: ['bookmark', userId, contentId],
      queryFn: () => getBookmark({ userId, contentId }),
    }),
};
