import { tourDetailSVG, commonSVG } from '@/assets';

import { ExtraInfo } from '@/features/tourDetail';
import { SafeHtmlRenderer } from '@/shared';

import type { Food, TourDetailCommon } from '@/entities/tour';

interface FoodInfoProps {
  common: TourDetailCommon;
  intro: Food;
}

export default function FoodInfo({ common, intro }: FoodInfoProps) {
  return (
    <>
      <section className="p-3 w-full flex flex-col gap-2 text-sm">
        {(intro.opendatefood || intro.opentimefood) && (
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
        {common.homepage && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.WWWIcon className="w-3 h-3" />
            <SafeHtmlRenderer html={common.homepage} />
          </div>
        )}
        <div className="flex gap-3 justify-start items-center">
          <commonSVG.LocationIcon className="w-3 h-3" />
          <div className="flex gap-1">
            <p>
              {common.addr1 ?? ''} {common.addr2 ?? ''} (우)
              {common.zipcode ?? ''}
            </p>
          </div>
        </div>
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
      </section>
      <hr className="my-3" />
      <section className="p-3 w-full flex flex-col gap-3">
        <ExtraInfo title="대표 메뉴" content={intro.firstmenu} />
        <ExtraInfo title="메뉴" content={intro.treatmenu} />
        <ExtraInfo title="포장" content={intro.packing} />
        <ExtraInfo title="흡연" content={intro.smoking} />
      </section>
    </>
  );
}
