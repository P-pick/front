import { queryOptions } from '@tanstack/react-query';

import { getTourReviewList } from '@/entities/review';

import { type getReviewRequest } from '@/entities/review/type/request';

export const reviewOptions = {
  getReview: ({ contentId }: getReviewRequest) =>
    queryOptions({
      queryKey: ['review', contentId],
      queryFn: () => getTourReviewList({ contentId }),
    }),
};
