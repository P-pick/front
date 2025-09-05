import { tourDetailSVG } from '@/assets';

import type { CultureFacility, TourDetailCommon } from '@/entities/tour';
import { getCopyClipBoard, SafeHtmlRenderer } from '@/shared';
import InfoLayout from './InfoLayout';
import ExtraInfo from './ExtraInfo';

interface CultureFacilityInfoProps {
  common: TourDetailCommon;
  intro: CultureFacility;
}

export default function CultureFacilityInfo({
  common,
  intro,
}: CultureFacilityInfoProps) {
  return (
    <InfoLayout>
      <InfoLayout.Header common={common}>
        {intro.usetimeculture && intro.restdateculture && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.TimeIcon className="w-3 h-3" />
            <div className="flex flex-col gap-1">
              {intro.usetimeculture && (
                <SafeHtmlRenderer html={intro.usetimeculture} />
              )}
              {intro.restdateculture && (
                <p>
                  <span className="text-red-600">휴무일</span>&nbsp;
                  <SafeHtmlRenderer html={intro.restdateculture} />
                </p>
              )}
            </div>
          </div>
        )}
        {intro.infocenterculture && (
          <div className="flex gap-3 justify-start items-center">
            <div className="flex gap-3">
              <tourDetailSVG.CallIcon className="w-3 h-3" />
            </div>
            <SafeHtmlRenderer html={intro.infocenterculture} />
            <button
              onClick={() => getCopyClipBoard(intro.infocenterculture)}
              className="text-xs text-blue-500"
            >
              복사
            </button>
          </div>
        )}
        {intro.parkingculture && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.ParkingIcon className="w-3 h-3" />
            <span>
              주차 {intro.parkingculture}&nbsp;
              {intro.parkingfee && `(${intro.parkingfee})`}
            </span>
          </div>
        )}
      </InfoLayout.Header>
      <InfoLayout.Content>
        {intro.usefee && <ExtraInfo title="상품" content={intro.usefee} />}
      </InfoLayout.Content>
      <InfoLayout.Footer common={common}></InfoLayout.Footer>
    </InfoLayout>
  );
}
