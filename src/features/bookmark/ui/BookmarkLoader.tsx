import { useSuspenseQuery } from '@tanstack/react-query';

import { ToggleBookmarkButton } from '@/features/bookmark';
import { bookmarkOptions } from '@/entities/bookmark';

export default function BookmarkLoader({
  uid,
  contentId,
}: {
  uid: string;
  contentId: string;
}) {
  const { data: bookmarked } = useSuspenseQuery(
    bookmarkOptions.getBookmark({ userId: uid, contentId }),
  );

  return (
    <ToggleBookmarkButton
      userId={uid}
      contentId={contentId}
      bookmarked={bookmarked}
    />
  );
}
