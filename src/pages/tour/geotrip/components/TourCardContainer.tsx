import { TourCard } from '@/components';
import type { TourSummary } from '@/pages/tour/geotrip/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { tourQueries } from '../../service';

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

  return (
    <TourCard
      title={title}
      distance={dist}
      imgUrl={firstimage || ''}
      tourTypeId={contenttypeid}
      businessHours={data.usetimeculture || data.usetime || data.playtime}
    />
  );
}
