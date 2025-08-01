import { database } from '@/shared/config/firbaseConfig';
import { query, orderByChild, equalTo, get, ref } from 'firebase/database';

interface GetBookmarkRequest {
  contentId: string;
  userId: string;
}
export const getBookmark = async ({
  contentId,
  userId,
}: GetBookmarkRequest): Promise<boolean> => {
  const authorContentId = `${userId}_${contentId}`;

  const bookmarksRef = ref(database, 'bookmarks');

  const bookmarksQuery = query(
    bookmarksRef,
    orderByChild('authorContentId'),
    equalTo(authorContentId),
  );

  const snapshot = await get(bookmarksQuery);

  if (snapshot.exists()) {
    const firstChildKey = Object.keys(snapshot.val())[0];
    return snapshot.val()[firstChildKey];
  }

  return true;
};
