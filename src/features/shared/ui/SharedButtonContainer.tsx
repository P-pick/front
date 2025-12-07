/* eslint-disable */
import { commonSVG } from '@/assets';
import useKakaoShare from '../lib/useKakaoShare';

interface SharedButtonContainerProps {
  contentId: string;
}

export default function SharedButtonContainer({
  contentId,
}: SharedButtonContainerProps) {
  const link = `${window.location.origin}/tour/single/${contentId}`;

  const { shareKakao } = useKakaoShare({ contentId, link });
  return (
    <button
      aria-label="공유하기"
      className="cursor-pointer"
      type="button"
      onClick={shareKakao}
    >
      <commonSVG.ShareIcon />
    </button>
  );
}
