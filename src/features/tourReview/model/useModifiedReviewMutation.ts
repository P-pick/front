import { reviewOptions, updateReview } from '@/entities/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useModifiedReviewMutation = ({ contentId }: { contentId: string }) => {
  const queryClient = useQueryClient();
  const queryKey = reviewOptions.getReview({ contentId }).queryKey;
  const mutation = useMutation({
    mutationFn: updateReview,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousReviews = queryClient.getQueryData(queryKey);

      const newReview = {
        contentId,
      };

      queryClient.setQueryData(queryKey, previousReviews);

      return { previousReviews, newReview };
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

export default useModifiedReviewMutation;
