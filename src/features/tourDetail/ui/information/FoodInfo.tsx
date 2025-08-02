import { tourDetailSVG } from '@/assets';

import { ExtraInfo, InfoLayout } from '@/features/tourDetail';
import { SafeHtmlRenderer } from '@/shared';

import type { Food, TourDetailCommon } from '@/entities/tour';

interface FoodInfoProps {
  common: TourDetailCommon;
  intro: Food;
}

export default function FoodInfo({ common, intro }: FoodInfoProps) {
  return (
    <InfoLayout>
      <InfoLayout.Header common={common}>
        {(intro.opendatefood || intro.opentimefood || intro.restdatefood) && (
          <div className="flex gap-3 justify-start items-center">
            <div>
              <tourDetailSVG.TimeIcon className="w-3 h-3" />
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {intro.opendatefood && (
                <div className="flex gap-1">
                  <span>운영일</span>
                  <SafeHtmlRenderer html={intro.opendatefood} />
                </div>
              )}
              {intro.opentimefood && (
                <div className="flex gap-1">
                  <span>운영시간</span>
                  <SafeHtmlRenderer html={intro.opentimefood} />
                </div>
              )}
              {intro.restdatefood && (
                <div className="flex gap-1">
                  <span className="text-red-600">휴무일</span>
                  <SafeHtmlRenderer html={intro.restdatefood} />
                </div>
              )}
            </div>
          </div>
        )}
        {(intro.infocenterfood || intro.reservationfood) && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.CallIcon className="w-3 h-3" />
            <div className="flex flex-col gap-1">
              {intro.infocenterfood && (
                <span>일반&nbsp;{intro.infocenterfood}</span>
              )}
              {intro.reservationfood && (
                <span>예약&nbsp;{intro.reservationfood}</span>
              )}
            </div>
          </div>
        )}
        {intro.parkingfood && (
          <div className="flex gap-3 justify-start items-center">
            <div>
              <tourDetailSVG.ParkingIcon className="w-3 h-3" />
            </div>
            <div className="flex gap-1">
              <span>주차</span>
              <SafeHtmlRenderer html={intro.parkingfood} />
            </div>
          </div>
        )}
      </InfoLayout.Header>
      <InfoLayout.Content>
        <ExtraInfo title="대표 메뉴" content={intro.firstmenu} />
        <ExtraInfo title="메뉴" content={intro.treatmenu} />
        <ExtraInfo title="포장" content={intro.packing} />
        <ExtraInfo title="흡연" content={intro.smoking} />
      </InfoLayout.Content>
      <InfoLayout.Footer common={common}></InfoLayout.Footer>
    </InfoLayout>
  );
}
