import { queryOptions } from '@tanstack/react-query';

import { deleteCurrentUser, getUser, signOutUser } from '@/entities/auth';

export const authOptions = {
  auth: () =>
    queryOptions({
      queryKey: ['auth'],
      queryFn: getUser,
      staleTime: 'static',
    }),
  signOut: () =>
    queryOptions({
      queryKey: ['signOut'],
      queryFn: signOutUser,
    }),
  deleteUser: () =>
    queryOptions({
      queryKey: ['deleteUser'],
      queryFn: deleteCurrentUser,
    }),
};
