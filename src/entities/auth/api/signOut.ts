import { getAuth, signOut } from 'firebase/auth';

const signOutUser = () => {
  const auth = getAuth();
  return signOut(auth);
};

export default signOutUser;
