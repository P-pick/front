import { getAuth } from 'firebase/auth'; // getAuth 임포트
import { database } from '@/shared/config/firbaseConfig';
import { push, ref, set } from 'firebase/database';

interface CreateBookmarkRequest {
  contentId: string;
}

export const createBookmark = async ({ contentId }: CreateBookmarkRequest) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error('로그인된 사용자가 없어 북마크를 생성할 수 없습니다.');
    throw new Error('User not authenticated');
  }

  const authorUid = currentUser.uid;

  const bookmarkRef = ref(database, 'bookmarks');
  const newBookmarkRef = push(bookmarkRef);

  await set(newBookmarkRef, {
    authorUid,
    contentId,
    bookmark: true,
    timestamp: Date.now(),
  });

  return newBookmarkRef.key;
};
