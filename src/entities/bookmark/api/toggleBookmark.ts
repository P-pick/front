import { ref, set } from 'firebase/database';

import { database } from '@/shared/config/firbaseConfig';

import type { GetBookmarkRequest } from '@/entities/bookmark';

interface ToggleBookmarkRequest extends GetBookmarkRequest {
  bookmarked: boolean;
}
export const toggleBookmark = async ({
  contentId,
  userId,
  bookmarked,
}: ToggleBookmarkRequest) => {
  const bookmarkRef = ref(database, `bookmarks/${userId}/${contentId}`);

  await set(bookmarkRef, {
    bookmarked,
    timestamp: Date.now(),
  });

  return bookmarkRef.key;
};
