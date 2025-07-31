import { getAuth, signInWithPopup } from 'firebase/auth';
import { provider } from '@/shared/config/firbaseConfig';

const signIn = () => {
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};

export default signIn;
