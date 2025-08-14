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

  const bookMarkIconColor = bookmarked ? 'text-primary-red' : 'text-white';

  return (
    <button
      className="flex items-center justify-center w-5 h-5"
      onClick={() =>
        mutate({
          userId,
          contentId,
          bookmarked: !bookmarked,
        })
      }
    >
      <commonSVG.BookMarkIcon className={bookMarkIconColor} />
    </button>
  );
}
