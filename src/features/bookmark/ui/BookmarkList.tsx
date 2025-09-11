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

  if (bookmarkList?.length === 0 || !bookmarkList) {
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
    <ul className="relative w-full h-full overflow-auto">
      {bookmarkList?.map(contentId => (
        <BookmarkCard key={contentId} contentId={contentId} />
      ))}
    </ul>
  );
}
