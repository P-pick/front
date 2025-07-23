import { tourQueries } from '@/entities/tour';
import { TourCard } from '@/shared/ui';
import { useSuspenseQueries } from '@tanstack/react-query';
import { extractRegionInfo } from '../../lib';
import type { TourSummary } from '../../types';

type TourCardContainerProps = Omit<TourSummary, 'mapx' | 'mapy'>;

export default function TourCardContainer({
  title,
  dist,
  firstimage,
  contenttypeid,
  contentid,
}: TourCardContainerProps) {
  const responseArray = useSuspenseQueries({
    queries: [
      tourQueries.detailCommon(contentid),
      tourQueries.detailIntro(contentid, contenttypeid),
    ] as const,
  });
  const commonData = responseArray[0].data;
  const introData = responseArray[1].data;
  const region = extractRegionInfo(commonData.addr1);

  return (
    <>
      <TourCard
        title={title}
        distance={dist}
        imgUrl={firstimage || ''}
        tourTypeId={contenttypeid}
        businessHours={
          introData.usetimeculture || introData.usetime || introData.playtime
        }
        address={`${region?.sido} ${region?.sigungu}`}
      />
      <div className="overflow-auto px-4">{commonData.overview}</div>
    </>
  );
}
