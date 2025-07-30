import { queryOptions } from '@tanstack/react-query';

import { signIn } from '@/entities/auth';

const authOptions = {
  signIn: () =>
    queryOptions({
      queryKey: ['signIn'],
      queryFn: () => signIn(),
    }),
};

export default authOptions;
