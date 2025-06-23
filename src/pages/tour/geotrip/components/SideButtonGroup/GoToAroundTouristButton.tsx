import { GeoMapIcon } from '@/assets';
import { useNavigate } from 'react-router-dom';

interface GoToAroundTouristMapProps {
  mapx?: number;
  mapy?: number;
  contentid: number;
}

export default function GoToAroundTouristButton({
  mapx,
  mapy,
  contentid,
}: GoToAroundTouristMapProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/map/around-search?lat=${mapy}&lng=${mapx}&contentid=${contentid}`
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer"
    >
      <GeoMapIcon />
    </button>
  );
}
