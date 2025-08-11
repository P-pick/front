import { tourDetailSVG } from '@/assets';

import { InfoLayout, ExtraInfo } from '@/features/tourDetail';
import { SafeHtmlRenderer } from '@/shared';

import type { TourDetailCommon, TouristAttraction } from '@/entities/tour';

interface TouristAttractionInfoProps {
  common: TourDetailCommon;
  intro: TouristAttraction;
}

export default function TouristAttractionInfo({
  common,
  intro,
}: TouristAttractionInfoProps) {
  return (
    <InfoLayout>
      <InfoLayout.Header common={common}>
        {(intro.usetime || intro.restdate) && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.TimeIcon className="w-3 h-3" />
            <div className="flex flex-col gap-1">
              {intro.usetime && <SafeHtmlRenderer html={intro.usetime} />}
              {intro.restdate && (
                <div className="flex gap-1">
                  <span className="text-red-600">휴무일</span>
                  <SafeHtmlRenderer html={intro.restdate} />
                </div>
              )}
            </div>
          </div>
        )}
        {intro.infocenter && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.CallIcon className="w-3 h-3" />
            {intro.infocenter}
          </div>
        )}
        {intro.parking && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.ParkingIcon className="w-3 h-3" />
            <div className="flex gap-1">
              <span>주차</span>
              <SafeHtmlRenderer html={intro.parking} />
            </div>
          </div>
        )}
      </InfoLayout.Header>
      <InfoLayout.Content>
        <ExtraInfo title="체험 안내" content={intro.expguide} />
        <ExtraInfo title="체험 가능 연령" content={intro.expagerange} />
      </InfoLayout.Content>
      <InfoLayout.Footer common={common}></InfoLayout.Footer>
    </InfoLayout>
  );
}
