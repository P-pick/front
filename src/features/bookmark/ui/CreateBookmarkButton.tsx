import { useMutation } from '@tanstack/react-query';

import { toggleBookmark } from '@/entities/bookmark';
import { commonSVG } from '@/assets';

export default function CreateBookmarkButton() {
  const mutation = useMutation({ mutationFn: toggleBookmark });
  return (
    <button
      onClick={() =>
        mutation.mutate({
          userId: 'iBK36X4YKkh0z2DZUdHKau29n8i1',
          contentId: '126823',
          bookmarked: true,
        })
      }
    >
      <commonSVG.BookMarkIcon />
    </button>
  );
}
