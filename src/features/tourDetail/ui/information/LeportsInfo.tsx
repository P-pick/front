import { tourDetailSVG } from '@/assets';

import { SafeHtmlRenderer } from '@/shared';

import type { Leports, TourDetailCommon } from '@/entities/tour';

import { InfoLayout } from '@/features/tourDetail';

interface LeportsInfoProps {
  common: TourDetailCommon;
  intro: Leports;
}

export default function LeportsInfo({ common, intro }: LeportsInfoProps) {
  return (
    <InfoLayout>
      <InfoLayout.Header common={common}>
        {intro.usetimeleports && (
          <div className="flex gap-3 justify-start items-center">
            <div>
              <tourDetailSVG.TimeIcon className="w-3 h-3" />
            </div>
            <div>
              <SafeHtmlRenderer html={intro.usetimeleports} />
              {intro.restdateleports && (
                <div className="flex gap-1">
                  <span className="text-red-600">휴무일</span>
                  <SafeHtmlRenderer html={intro.restdateleports} />
                </div>
              )}
            </div>
          </div>
        )}
        {intro.infocenterleports && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.CallIcon className="w-3 h-3" />{' '}
            <SafeHtmlRenderer html={intro.infocenterleports} />
          </div>
        )}
        {intro.parkingleports && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.ParkingIcon className="w-3 h-3" /> 주차
            {intro.parkingleports}
            {intro.parkingfeeleports && `(${intro.parkingfeeleports})`}
          </div>
        )}
      </InfoLayout.Header>
      <InfoLayout.Content></InfoLayout.Content>
      <InfoLayout.Footer common={common}></InfoLayout.Footer>
    </InfoLayout>
  );
}
