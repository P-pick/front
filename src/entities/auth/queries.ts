import { queryOptions } from '@tanstack/react-query';

import { getUser } from '@/entities/auth/api';

export const authOptions = {
  auth: () =>
    queryOptions({
      queryKey: ['auth'],
      queryFn: getUser,
      staleTime: 'static',
    }),
};
