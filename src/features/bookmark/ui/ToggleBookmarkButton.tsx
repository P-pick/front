import { commonSVG } from '@/assets';
import { useToggleBookmarkMutation } from '@/features/bookmark';

interface ToggleBookmarkButtonProps {
  userId: string;
  contentId: string;
  bookmarked: boolean | null;
  className?: string;
}

export default function ToggleBookmarkButton({
  userId,
  contentId,
  bookmarked,
}: ToggleBookmarkButtonProps) {
  const { mutate } = useToggleBookmarkMutation({
    contentId,
    userId,
    bookmarked: Boolean(bookmarked),
  });

  return (
    <button
      onClick={() =>
        mutate({
          userId,
          contentId,
          bookmarked: !bookmarked,
        })
      }
    >
      {!bookmarked ? (
        <commonSVG.BookMarkIcon className="text-black" />
      ) : (
        <commonSVG.HeartIcon />
      )}
    </button>
  );
}
