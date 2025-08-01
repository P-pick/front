import { queryOptions } from '@tanstack/react-query';

import { getBookmark } from '@/entities/bookmark';

export const bookmarkQueries = {
  getBookmark: (contentId: string, userId: string) =>
    queryOptions({
      queryKey: ['bookmark', contentId, userId],
      queryFn: () => getBookmark({ contentId, userId }),
    }),
};
