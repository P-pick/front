import { useMutation } from '@tanstack/react-query';

import { toggleBookmark } from '@/entities/bookmark';
import { commonSVG } from '@/assets';

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
  const mutation = useMutation({ mutationFn: toggleBookmark });
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
