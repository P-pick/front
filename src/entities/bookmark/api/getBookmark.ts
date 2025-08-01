import { get, ref } from 'firebase/database';

import { database } from '@/shared/config/firbaseConfig';

interface GetBookmarkRequest {
  userId: string;
  contentId: string;
}
export const getBookmark = async ({
  userId,
  contentId,
}: GetBookmarkRequest): Promise<boolean | null> => {
  const bookmarkRef = ref(database, `bookmarks/${userId}/${contentId}`);
  const snapshot = await get(bookmarkRef);

  if (snapshot.exists()) {
    return snapshot.val().bookmarked;
  } else {
    return null;
  }
};
