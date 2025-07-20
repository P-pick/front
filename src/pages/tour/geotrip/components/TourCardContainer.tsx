import type { TourSummary } from '@/pages/tour/geotrip/types';
import { tourQueries } from '../../service';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TourCard } from '@/components';

type TourCardContainerProps = Omit<TourSummary, 'mapx' | 'mapy'>;

export default function TourCardContainer({
  title,
  dist,
  firstimage,
  contenttypeid,
  contentid,
}: TourCardContainerProps) {
  const { data } = useSuspenseQuery(
    tourQueries.detailInfo(contentid, contenttypeid),
  );
  console.log(data.playtime);

  return (
    <TourCard
      title={title}
      distance={dist}
      imgUrl={firstimage || ''}
      tourTypeId={contenttypeid}
    />
  );
}
