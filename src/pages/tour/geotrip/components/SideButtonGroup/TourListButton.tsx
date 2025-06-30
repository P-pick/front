import { commonSVG } from '@/assets';
import { useLocation, useNavigate } from 'react-router-dom';
export default function TourListButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentParams = new URLSearchParams(location.search);
  const handleClick = () => {
    navigate(`/tour/list?${currentParams.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer"
    >
      <commonSVG.ListIcon />
    </button>
  );
}
