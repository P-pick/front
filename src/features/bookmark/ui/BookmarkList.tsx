import { useSuspenseQuery } from '@tanstack/react-query';

import { bookmarkOptions } from '@/entities/bookmark';
import type { User } from '@/entities/auth';
import BookmarkCard from './BookmarkCard';

interface BookmarkListProps {
  user: User | null;
}

export default function BookmarkList({ user }: BookmarkListProps) {
  const { data: bookmarkList } = useSuspenseQuery(
    bookmarkOptions.getBookmarkList(user?.uid || ''),
  );

  return (
    <ul className="relative w-full h-full overflow-auto">
      {bookmarkList?.map(contentId => (
        <BookmarkCard key={contentId} contentId={contentId} />
      ))}
    </ul>
  );
}
