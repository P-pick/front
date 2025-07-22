import TourOverView from '@/pages/tour/geotrip/components/TourOverView';
import type { TourSummary } from '@/pages/tour/geotrip/types';
import { TourCard } from '@/shared';
import { useSuspenseQueries } from '@tanstack/react-query';
import { tourQueries } from '../../service';
import { extractRegionInfo } from '../lib';

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
      <TourOverView overView={commonData.overview} />
    </>
  );
}
