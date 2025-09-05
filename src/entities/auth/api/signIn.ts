import { getAuth, signInWithPopup } from 'firebase/auth';
import { provider } from '@/shared/config/firebaseConfig';

const signIn = () => {
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};

export default signIn;
