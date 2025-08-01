import { useSuspenseQuery } from '@tanstack/react-query';

import { authOptions } from '@/entities/auth/queries';
import { bookmarkOptions } from '@/entities/bookmark';
import CreateBookmarkButton from '@/features/bookmark/ui/CreateBookmarkButton';

export default function BookmarkButtonContainer() {
  const { data: user } = useSuspenseQuery(authOptions.auth());
  const a = useSuspenseQuery(
    bookmarkOptions.getBookmark({
      userId: user?.uid,
      contentId: '126823',
    }),
  );
  console.log(a.data);

  console.log(user);
  return (
    <>
      <CreateBookmarkButton />
    </>
  );
}
