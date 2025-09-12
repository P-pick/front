import { ref, set } from 'firebase/database';

import { database } from '@/shared/config/firebaseConfig';

import type { ToggleBookmarkRequest } from '@/entities/bookmark/type';

export const toggleBookmark = async ({
  contentId,
  userId,
  bookmarked,
}: ToggleBookmarkRequest) => {
  const bookmarkRef = ref(database, `bookmarks/${userId}/${contentId}`);

  await set(bookmarkRef, {
    contentId,
    userId,
    bookmarked,
    timestamp: Date.now(),
  });

  return bookmarkRef.key;
};
