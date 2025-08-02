import { getAuth, onAuthStateChanged } from 'firebase/auth';

import type { User } from '@/entities/auth';

const getUser = (): Promise<User | null> => {
  const auth = getAuth();
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });
};

export default getUser;
