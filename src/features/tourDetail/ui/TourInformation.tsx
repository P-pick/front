import { useSuspenseQueries } from '@tanstack/react-query';
import { tourQueries, type AroundContentTypeId } from '@/entities/tour';
import { TouristAttractionInfo } from './information';

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

  if (tourCommon.contenttypeid === '12') {
    return <TouristAttractionInfo {...tourIntro} />;
  }
}
