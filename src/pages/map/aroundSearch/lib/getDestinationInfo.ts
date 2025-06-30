import type { AroundContentTypeId } from '@/pages/types';
import { useSearchParams } from 'react-router-dom';

const useGetDestinationInfo = () => {
  const [searchParams] = useSearchParams();

  const contentTypeId = searchParams.get(
    'contentTypeId'
  ) as AroundContentTypeId;
  const mapx = searchParams.get('mapx');
  const mapy = searchParams.get('mapy');
  const destination = {
    lng: mapx ? parseFloat(mapx) : 0,
    lat: mapy ? parseFloat(mapy) : 0,
  };
  const dist = searchParams.get('dist');
  const overview = searchParams.get('overview');
  const title = searchParams.get('title');

  const currentTourInfo = {
    dist: dist || '',
    overview: overview || '',
    title: title || '',
    mapx: destination.lng,
    mapy: destination.lat,
    contenttypeid: contentTypeId,
  };

  return { currentTourInfo, destination };
};

export default useGetDestinationInfo;
