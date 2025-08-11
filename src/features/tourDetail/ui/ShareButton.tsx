import { commonSVG } from '@/assets';

export default function ShareButton() {
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('현재 페이지 주소가 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('URL 복사 실패:', err);
      alert('URL 복사에 실패했습니다.');
    }
  };

  return (
    <commonSVG.ShareIcon className="cursor-pointer" onClick={handleCopyUrl} />
  );
}
