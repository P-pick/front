import { useSuspenseQueries } from '@tanstack/react-query';

import { tourQueries } from '@/entities/tour';

import { extractRegionInfo } from '@/features/tour';
import {
  TourCard,
  TourCardNavigate,
  TourOverview,
  TourReview,
} from '@/features/tourDetail';

import type { TourSummary } from '@/features/tour';
import { useState } from 'react';

type TourCardContainerProps = Omit<TourSummary, 'mapx' | 'mapy'>;

export default function TourCardContainer({
  title,
  dist,
  firstimage,
  contenttypeid,
  contentid,
}: TourCardContainerProps) {
  const [currentSection, setCurrentSection] = useState('overview');

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
      <TourCardNavigate
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      {currentSection === 'overview' && (
        <TourOverview description={commonData?.overview} />
      )}
      {currentSection === 'review' && <TourReview contentId={contentid} />}
    </>
  );
}
