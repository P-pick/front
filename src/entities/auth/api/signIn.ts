import { auth, provider } from '@/shared/config/firbaseConfig';
import { signInWithPopup } from 'firebase/auth';

const signIn = () => {
  return signInWithPopup(auth, provider);
};

export default signIn;
