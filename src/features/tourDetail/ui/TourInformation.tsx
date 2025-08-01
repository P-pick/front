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

import type { AroundContentTypeId } from '@/entities/tour';
import { getTypedInformation } from '@/features/tourDetail';
import { SwitchCase } from '@/shared';

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
            intro={getTypedInformation('12', tourIntro)}
          />
        ),
        '14': (
          <CultureFacilityInfo
            common={tourCommon}
            intro={getTypedInformation('14', tourIntro)}
          />
        ),
        '15': (
          <FestivalEventInfo
            common={tourCommon}
            intro={getTypedInformation('15', tourIntro)}
          />
        ),
        '25': (
          <TourCourseInfo
            common={tourCommon}
            intro={getTypedInformation('25', tourIntro)}
          />
        ),
        '28': (
          <LeportsInfo
            common={tourCommon}
            intro={getTypedInformation('28', tourIntro)}
          />
        ),
        '32': (
          <LodgingInfo
            common={tourCommon}
            intro={getTypedInformation('32', tourIntro)}
          />
        ),
        '38': (
          <ShoppingInfo
            common={tourCommon}
            intro={getTypedInformation('38', tourIntro)}
          />
        ),
        '39': (
          <FoodInfo
            common={tourCommon}
            intro={getTypedInformation('39', tourIntro)}
          />
        ),
      }}
      defaultComponent={<div>정보가 없습니다.</div>}
    />
  );
}
