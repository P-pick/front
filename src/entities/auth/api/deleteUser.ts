import { deleteUser, getAuth } from 'firebase/auth';

const deleteCurrentUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error('사용자가 로그인되어 있지 않습니다.');
    return;
  }

  try {
    await deleteUser(user);
  } catch (error) {
    console.error('사용자 삭제 실패:', error);
  }
};

export default deleteCurrentUser;
