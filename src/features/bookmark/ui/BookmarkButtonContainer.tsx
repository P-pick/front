import { useSuspenseQuery } from '@tanstack/react-query';

import { ToggleBookmarkButton } from '@/features/bookmark';
import { bookmarkOptions } from '@/entities/bookmark';

interface BookmarkButtonContainerProps {
  contentId: string;
  userId: string;
}

export default function BookmarkButtonContainer({
  contentId,
  userId,
}: BookmarkButtonContainerProps) {
  const { data: bookmark } = useSuspenseQuery(
    bookmarkOptions.getBookmark({
      userId,
      contentId,
    }),
  );

  return (
    <>
      <ToggleBookmarkButton
        userId={userId}
        contentId={contentId}
        bookmarked={bookmark}
      />
    </>
  );
}
