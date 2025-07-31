import { getUser } from '@/entities/auth/api';
import { queryOptions } from '@tanstack/react-query';

export const authOptions = {
  auth: () =>
    queryOptions({
      queryKey: ['auth'],
      queryFn: getUser,
      staleTime: 'static',
    }),
};
