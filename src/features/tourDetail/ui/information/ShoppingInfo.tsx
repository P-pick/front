import { tourDetailSVG, commonSVG } from '@/assets';

import { ExtraInfo } from '@/features/tourDetail';
import { SafeHtmlRenderer } from '@/shared';

import type { Shopping, TourDetailCommon } from '@/entities/tour';

interface ShoppingInfoProps {
  common: TourDetailCommon;
  intro: Shopping;
}

export default function ShoppingInfo({ common, intro }: ShoppingInfoProps) {
  return (
    <>
      <section className="p-3 w-full flex flex-col gap-2 text-sm">
        {(intro.fairday || intro.opentime) && (
          <div className="flex gap-3 justify-start items-center">
            <div>
              <tourDetailSVG.TimeIcon className="w-3 h-3" />
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {intro.fairday && (
                <div className="flex gap-1">
                  <span>운영일</span> <SafeHtmlRenderer html={intro.fairday} />
                </div>
              )}
              {intro.opentime && (
                <div className="flex gap-1">
                  <span>운영시간</span>
                  <SafeHtmlRenderer html={intro.opentime} />
                </div>
              )}
              {intro.restdateshopping && (
                <div className="flex gap-1">
                  <span className="text-red-600">휴무일</span>
                  <SafeHtmlRenderer html={intro.restdateshopping} />
                </div>
              )}
            </div>
          </div>
        )}
        {intro.infocentershopping && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.CallIcon className="w-3 h-3" />
            <span>{intro.infocentershopping}</span>
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
        {intro.parkingshopping && (
          <div className="flex gap-3 justify-start items-center">
            <div>
              <tourDetailSVG.ParkingIcon className="w-3 h-3" />
            </div>
            <div className="flex gap-1">
              <span>주차</span>
              <SafeHtmlRenderer html={intro.parkingshopping} />
            </div>
          </div>
        )}
      </section>
      <hr className="my-3" />
      <section className="p-3 w-full flex flex-col gap-3">
        <ExtraInfo title="할인 정보" content={intro.saleitem} />
        <ExtraInfo title="휴게 공간" content={intro.restroom} />
        <ExtraInfo title="쇼핑 정보" content={intro.shopguide} />
      </section>
    </>
  );
}
