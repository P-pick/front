import { getAuth, onAuthStateChanged } from 'firebase/auth';

import type { User } from '@/entities/auth';

export const waitForUser = (): Promise<User> => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      if (user) resolve(user);
      else reject(new Error('로그인 필요'));
    });
  });
};
