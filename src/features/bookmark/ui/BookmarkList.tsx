import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { bookmarkOptions } from '@/entities/bookmark';
import type { User } from '@/entities/auth';
import BookmarkCard from './BookmarkCard';
import { InfiniteScroll } from '@/shared';
import { SkeletonCard } from '@/features/tour';

interface BookmarkListProps {
  user: User | null;
}

export default function BookmarkList({ user }: BookmarkListProps) {
  const {
    data: bookmarkList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    bookmarkOptions.getBookmarkList(user?.uid || ''),
  );

  const bookmarks = bookmarkList?.pages.flatMap(page => page?.bookmarks) || [];

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col h-full">
        <p>북마크가 없습니다.</p>
        <p className="flex flex-col justify-center items-center text-sm text-gray-500 mt-2">
          <span>숏폼과, 리스트 페이지에서 </span>
          <span>❤️를 눌러 원하는 북마크를 추가해 보세요!</span>
        </p>
      </div>
    );
  }

  return (
    <section className="relative overflow-y-auto h-full">
      {bookmarks.map(bookmark => (
        <BookmarkCard key={bookmark?.spotId} contentId={bookmark?.spotId} />
      ))}
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
        onIntersect={fetchNextPage}
        LoadingComponent={<SkeletonCard />}
        triggerClassName="h-50"
      />
    </section>
  );
}
