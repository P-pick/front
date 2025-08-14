import { useSuspenseQuery } from '@tanstack/react-query';

import { BookmarkLoader } from '@/features/bookmark';
import { authOptions } from '@/entities/auth';
import { commonSVG } from '@/assets';

interface BookmarkButtonContainerProps {
  contentId: string;
}

interface BookmarkButtonContainerProps {
  contentId: string;
}

export default function BookmarkButtonContainer({
  contentId,
}: BookmarkButtonContainerProps) {
  const { data: auth } = useSuspenseQuery(authOptions.auth());

  if (!auth) return <commonSVG.BookMarkIcon />;

  return <BookmarkLoader uid={auth.uid} contentId={contentId} />;
}
