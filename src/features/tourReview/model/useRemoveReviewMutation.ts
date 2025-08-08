import { reviewOptions, ReviewResponse } from '@/entities/review';
import removeReview from '@/entities/review/api/removeReview';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useRemoveReviewMutation = ({
  contentId,
  reviewId,
}: {
  contentId: string;
  reviewId: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = reviewOptions.getReview({ contentId }).queryKey;
  const mutation = useMutation({
    mutationFn: removeReview,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousReviews = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, old =>
        old ? old.filter(r => r.id !== reviewId) : [],
      );

      queryClient.setQueryData(queryKey, previousReviews);

      return { previousReviews };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousReviews);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return mutation;
};

export default useRemoveReviewMutation;
