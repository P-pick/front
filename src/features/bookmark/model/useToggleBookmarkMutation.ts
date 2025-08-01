import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkOptions, toggleBookmark } from '@/entities/bookmark';

import type { ToggleBookmarkRequest } from '@/entities/bookmark';

export const useToggleBookmarkMutation = ({
  contentId,
  userId,
  bookmarked,
}: ToggleBookmarkRequest) => {
  const queryClient = useQueryClient();
  const queryKey = bookmarkOptions.getBookmark({ userId, contentId }).queryKey;
  const mutation = useMutation({
    mutationFn: toggleBookmark,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousBookmark = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, bookmarked);

      return { previousBookmark, bookmarked };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousBookmark);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
};
