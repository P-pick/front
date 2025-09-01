import { authOptions } from '@/entities/auth';
import { bookmarkOptions } from '@/entities/bookmark';
import { BookmarkCard } from '@/features/bookmark';
import { BottomNavigationBar } from '@/shared';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function Bookmark() {
  const { data: user } = useSuspenseQuery(authOptions.auth());
  const { data: bookmarkList } = useSuspenseQuery(
    bookmarkOptions.getBookmarkList(user?.uid || ''),
  );

  return (
    <section className="flex max-w-[375px] flex-col h-full">
      <ul className="relative w-full h-full overflow-auto">
        {bookmarkList?.map(contentId => (
          <BookmarkCard key={contentId} contentId={contentId} />
        ))}
      </ul>
      <BottomNavigationBar />
    </section>
  );
}
