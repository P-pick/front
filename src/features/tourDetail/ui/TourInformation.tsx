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
import { SwitchCase } from '@/shared';

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

  return (
    <SwitchCase
      value={contentTypeId}
      cases={{
        '': <div>정보가 없습니다.</div>,
        '12': (
          <TouristAttractionInfo
            common={tourCommon}
            intro={tourIntro as TouristAttraction}
          />
        ),
        '14': (
          <CultureFacilityInfo
            common={tourCommon}
            intro={tourIntro as CultureFacility}
          />
        ),
        '15': (
          <FestivalEventInfo
            common={tourCommon}
            intro={tourIntro as FestivalEvent}
          />
        ),
        '25': (
          <TourCourseInfo common={tourCommon} intro={tourIntro as TourCourse} />
        ),
        '28': <LeportsInfo common={tourCommon} intro={tourIntro as Leports} />,
        '32': <LodgingInfo common={tourCommon} intro={tourIntro as Lodging} />,
        '38': (
          <ShoppingInfo common={tourCommon} intro={tourIntro as Shopping} />
        ),
        '39': <FoodInfo common={tourCommon} intro={tourIntro as Food} />,
      }}
      defaultComponent={<div>정보가 없습니다.</div>}
    />
  );
}
