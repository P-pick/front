import { commonSVG } from '@/assets';
import { useNavigate } from 'react-router-dom';
import type { TourSummary } from '../../types';

export default function GoToAroundTouristButton(tourInfo: TourSummary) {
  const navigate = useNavigate();

  const tourInfoStringRecord = Object.entries(tourInfo).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {} as Record<string, string>
  );

  const encodingTour = new URLSearchParams(tourInfoStringRecord);

  const handleClick = () => {
    navigate(`/map/around-search?tourInfo=${encodingTour}`);
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
