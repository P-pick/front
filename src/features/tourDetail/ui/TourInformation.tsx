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

import type { AroundContentTypeId } from '@/entities/tour';
import { castTourIntro } from '../util/castTourIntro';

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

  const touristAttraction = castTourIntro(tourIntro, '12');
  const cultureFacility = castTourIntro(tourIntro, '14');
  const festivalEvent = castTourIntro(tourIntro, '15');
  const tourCourse = castTourIntro(tourIntro, '25');
  const leports = castTourIntro(tourIntro, '28');
  const lodging = castTourIntro(tourIntro, '32');
  const shopping = castTourIntro(tourIntro, '38');
  const food = castTourIntro(tourIntro, '39');

  return (
    <SwitchCase
      value={contentTypeId}
      cases={{
        '': <div>정보가 없습니다.</div>,
        '12': (
          <TouristAttractionInfo
            common={tourCommon}
            intro={touristAttraction}
          />
        ),
        '14': (
          <CultureFacilityInfo common={tourCommon} intro={cultureFacility} />
        ),
        '15': <FestivalEventInfo common={tourCommon} intro={festivalEvent} />,
        '25': <TourCourseInfo common={tourCommon} intro={tourCourse} />,
        '28': <LeportsInfo common={tourCommon} intro={leports} />,
        '32': <LodgingInfo common={tourCommon} intro={lodging} />,
        '38': <ShoppingInfo common={tourCommon} intro={shopping} />,
        '39': <FoodInfo common={tourCommon} intro={food} />,
      }}
      defaultComponent={<div>정보가 없습니다.</div>}
    />
  );
}
