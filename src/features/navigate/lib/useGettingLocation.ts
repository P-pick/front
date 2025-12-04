import { useSearchParams } from 'react-router-dom';

const useGettingLocation = () => {
  const [searchParams] = useSearchParams();

  //좌표
  const lng = searchParams.get('lnt');
  const lat = searchParams.get('lat');

  const destination = {
    lng: lng ? parseFloat(lng) : 0,
    lat: lat ? parseFloat(lat) : 0,
  };

  return { destination };
};

export default useGettingLocation;
