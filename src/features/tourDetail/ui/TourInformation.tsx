import { useSuspenseQueries } from '@tanstack/react-query';

import { tourQueries } from '@/entities/tour';
import {
  TouristAttractionInfo,
  CultureFacilityInfo,
  FestivalEventInfo,
  LeportsInfo,
  TourCourseInfo,
  LodgingInfo,
  ShoppingInfo,
  FoodInfo,
} from '@/features/tourDetail';

import type {
  AroundContentTypeId,
  CultureFacility,
  FestivalEvent,
  Food,
  Leports,
  Lodging,
  Shopping,
  TourCourse,
  TouristAttraction,
} from '@/entities/tour';

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
    return (
      <TouristAttractionInfo
        common={tourCommon}
        intro={tourIntro as TouristAttraction}
      />
    );
  }

  if (tourCommon.contenttypeid === '14') {
    return (
      <CultureFacilityInfo
        common={tourCommon}
        intro={tourIntro as CultureFacility}
      />
    );
  }

  if (tourCommon.contenttypeid === '15') {
    return (
      <FestivalEventInfo
        common={tourCommon}
        intro={tourIntro as FestivalEvent}
      />
    );
  }

  if (tourCommon.contenttypeid === '25') {
    return (
      <TourCourseInfo common={tourCommon} intro={tourIntro as TourCourse} />
    );
  }

  if (tourCommon.contenttypeid === '28') {
    return <LeportsInfo common={tourCommon} intro={tourIntro as Leports} />;
  }

  if (tourCommon.contenttypeid === '32') {
    return <LodgingInfo common={tourCommon} intro={tourIntro as Lodging} />;
  }

  if (tourCommon.contenttypeid === '38') {
    return <ShoppingInfo common={tourCommon} intro={tourIntro as Shopping} />;
  }

  if (tourCommon.contenttypeid === '39') {
    return <FoodInfo common={tourCommon} intro={tourIntro as Food} />;
  }

  return null;
}
