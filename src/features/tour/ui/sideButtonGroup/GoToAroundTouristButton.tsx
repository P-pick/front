import { commonSVG } from '@/assets';
import { useNavigate } from 'react-router-dom';
import type { TourSummary } from '../../types';

export default function GoToAroundTouristButton(tourInfo: TourSummary) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/map/around-search?contentId=${tourInfo.contentid}&contentTypeId=${tourInfo.contenttypeid}&lng=${tourInfo.mapx}&lat=${tourInfo.mapy}`,
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer"
    >
      <commonSVG.GeoMapIcon />
    </button>
  );
}
