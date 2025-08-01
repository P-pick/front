import { useSuspenseQuery } from '@tanstack/react-query';

import { authOptions } from '@/entities/auth/queries';

export default function BookmarkButtonContainer() {
  const { data: user } = useSuspenseQuery(authOptions.auth());

  console.log(user);
  return <div>{/* Bookmark button UI goes here */}</div>;
}
