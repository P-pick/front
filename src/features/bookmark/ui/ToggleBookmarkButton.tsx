import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commonSVG } from '@/assets';
import { bookmarkOptions, toggleBookmark } from '@/entities/bookmark';

interface ToggleBookmarkButtonProps {
  userId: string;
  contentId: string;
  bookmarked: boolean | null;
}
export default function ToggleBookmarkButton({
  userId,
  contentId,
  bookmarked,
}: ToggleBookmarkButtonProps) {
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
    onError: (error, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousBookmark);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <button
      onClick={() =>
        mutation.mutate({
          userId,
          contentId,
          bookmarked: !bookmarked,
        })
      }
    >
      {!bookmarked ? <commonSVG.BookMarkIcon /> : <commonSVG.HeartIcon />}
    </button>
  );
}
