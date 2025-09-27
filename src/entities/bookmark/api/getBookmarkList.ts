import {
  get,
  limitToFirst,
  orderByChild,
  query,
  ref,
  startAfter,
} from 'firebase/database';

import { database } from '@/shared/config/firebaseConfig';
import type {
  Bookmark,
  getBookmarkListRequest,
  getBookmarkListResponse,
} from '../type';

const PAGE_SIZE = 10;

export const getBookmarkList = async ({
  userId,
  pageParam,
}: getBookmarkListRequest): Promise<getBookmarkListResponse | null> => {
  const bookmarkRef = ref(database, `bookmarks/${userId}`);

  let bookmarksQuery;
  if (pageParam) {
    bookmarksQuery = query(
      bookmarkRef,
      orderByChild(`timestamp`),
      startAfter(pageParam),
      limitToFirst(PAGE_SIZE),
    );
  } else {
    bookmarksQuery = query(
      bookmarkRef,
      orderByChild(`timestamp`),
      limitToFirst(PAGE_SIZE),
    );
  }

  const snapshot = await get(bookmarksQuery);
  if (!snapshot.exists()) return { bookmarks: [], nextCursor: null };

  const bookmarks: Bookmark[] = [];
  snapshot.forEach(child => {
    const val = child.val();
    bookmarks.push({
      spotId: child.key as string,
      bookmarked: val.bookmarked,
      timestamp: val.timestamp,
    });
  });

  const lastItem = bookmarks[bookmarks.length - 1];

  return {
    bookmarks,
    nextCursor: lastItem?.timestamp ?? null,
  };
};
