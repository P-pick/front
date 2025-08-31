import { authOptions } from '@/entities/auth';
import { bookmarkOptions } from '@/entities/bookmark';
import { BookmarkCard } from '@/features/bookmark';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function Bookmark() {
  const { data: user } = useSuspenseQuery(authOptions.auth());
  const { data: bookmarkList } = useSuspenseQuery(
    bookmarkOptions.getBookmarkList(user?.uid || ''),
  );

  return (
    <div>
      {bookmarkList?.map(contentId => (
        <BookmarkCard key={contentId} contentId={contentId} />
      ))}
    </div>
  );
}
