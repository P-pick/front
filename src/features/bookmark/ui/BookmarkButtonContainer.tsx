import { useSuspenseQuery } from '@tanstack/react-query';

import { ToggleBookmarkButton } from '@/features/bookmark';

import { authOptions } from '@/entities/auth/queries';
import { bookmarkOptions } from '@/entities/bookmark';

interface BookmarkButtonContainerProps {
  contentId: string;
}
export default function BookmarkButtonContainer({
  contentId,
}: BookmarkButtonContainerProps) {
  const { data: user } = useSuspenseQuery(authOptions.auth());
  const { data: bookmark } = useSuspenseQuery(
    bookmarkOptions.getBookmark({
      userId: user?.uid,
      contentId,
    }),
  );

  return (
    <>
      <ToggleBookmarkButton
        userId={user?.uid}
        contentId={contentId}
        bookmarked={bookmark}
      />
    </>
  );
}
