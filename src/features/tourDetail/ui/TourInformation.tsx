import { useSuspenseQueries } from '@tanstack/react-query';

import { tourQueries } from '@/entities/tour';
import {
  TouristAttractionInfo,
  CultureFacility,
  FestivalEvent,
} from '@/features/tourDetail';

import type { AroundContentTypeId } from '@/entities/tour';

interface TourInformationProps {
  contentId: string;
  contentTypeId: AroundContentTypeId;
}

export default function TourInformation({
  contentId,
  contentTypeId,
}: TourInformationProps) {
  const tourResponse = useSuspenseQueries({
    queries: [
      tourQueries.detailCommon(contentId),
      tourQueries.detailIntro(contentId, contentTypeId),
    ] as const,
  });

  const tourCommon = tourResponse[0].data;
  const tourIntro = tourResponse[1].data;

  console.log('tourCommon', tourCommon, 'tourIntro', tourIntro);

  if (tourCommon.contenttypeid === '12') {
    return <TouristAttractionInfo common={tourCommon} intro={tourIntro} />;
  }

  if (tourCommon.contenttypeid === '14') {
    return <CultureFacility common={tourCommon} intro={tourIntro} />;
  }

  if (tourCommon.contenttypeid === '15') {
    return <FestivalEvent common={tourCommon} intro={tourIntro} />;
  }

  return null;
}
