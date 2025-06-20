import { TourList } from '@/assets';
import { useLocation, useNavigate } from 'react-router-dom';
export default function TourListButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentParams = new URLSearchParams(location.search);
  const handleClick = () => {
    navigate(`/tour/list?${currentParams.toString()}`);
  };
  return (
    <button onClick={handleClick}>
      <TourList />
    </button>
  );
}
