import { get, ref } from 'firebase/database';

import { database } from '@/shared/config/firebaseConfig';

export const getBookmarkList = async (
  userId: string,
): Promise<string[] | null> => {
  const bookmarkRef = ref(database, `bookmarks/${userId}`);
  const snapshot = await get(bookmarkRef);

  if (snapshot.exists()) {
    return Object.keys(snapshot.val());
  } else {
    return null;
  }
};
