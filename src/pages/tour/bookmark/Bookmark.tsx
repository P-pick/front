import { useSuspenseQuery } from '@tanstack/react-query';

import { Header, Seo } from '@/widgets';
import { BookmarkCard } from '@/features/bookmark';
import { authOptions } from '@/entities/auth';
import { bookmarkOptions } from '@/entities/bookmark';
import { BottomNavigationBar } from '@/shared';

export default function Bookmark() {
  const { data: user } = useSuspenseQuery(authOptions.auth());
  const { data: bookmarkList } = useSuspenseQuery(
    bookmarkOptions.getBookmarkList(user?.uid || ''),
  );

  return (
    <>
      <Seo
        title="북마크"
        description="북마크 페이지입니다. 즐겨찾는 관광지를 한눈에 확인하고 관리해보세요."
        canonicalUrl="https://p-pick.com/tour/bookmark"
      />
      <section className="flex max-w-[375px] flex-col h-full">
        <Header className="w-full flex items-center justify-between px-3 pt-1">
          <span>북마크</span>
        </Header>
        <ul className="relative w-full h-full overflow-auto">
          {bookmarkList?.map(contentId => (
            <BookmarkCard key={contentId} contentId={contentId} />
          ))}
        </ul>
        <BottomNavigationBar />
      </section>
    </>
  );
}
