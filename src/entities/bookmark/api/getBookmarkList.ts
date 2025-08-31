import { get, ref } from 'firebase/database';

import { database } from '@/shared/config/firebaseConfig';
import type { GetBookmarkRequest } from '@/entities/bookmark/type';

export const getBookmarkList = async ({
  userId,
}: Omit<GetBookmarkRequest, 'contentId'>): Promise<boolean | null> => {
  const bookmarkRef = ref(database, `bookmarks/${userId}`);
  const snapshot = await get(bookmarkRef);

  if (snapshot.exists()) {
    return snapshot.val().bookmarked;
  } else {
    return null;
  }
};
