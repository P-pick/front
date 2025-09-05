import { tourDetailSVG } from '@/assets';

import { ExtraInfo, InfoLayout } from '@/features/tourDetail';
import { getCopyClipBoard, SafeHtmlRenderer } from '@/shared';

import type { Shopping, TourDetailCommon } from '@/entities/tour';

interface ShoppingInfoProps {
  common: TourDetailCommon;
  intro: Shopping;
}

export default function ShoppingInfo({ common, intro }: ShoppingInfoProps) {
  return (
    <InfoLayout>
      <InfoLayout.Header common={common}>
        {(intro.fairday || intro.opentime || intro.restdateshopping) && (
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
            <button
              onClick={() => getCopyClipBoard(intro.infocentershopping)}
              className="text-xs text-blue-500"
            >
              복사
            </button>
          </div>
        )}
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
      </InfoLayout.Header>
      <InfoLayout.Content>
        {(intro.chkbabycarriageshopping || intro.chkpetshopping) && (
          <div>
            {intro.chkbabycarriageshopping && (
              <div className="flex gap-1">
                <span>유모차 대여</span>
                <SafeHtmlRenderer html={intro.chkbabycarriageshopping} />
              </div>
            )}
            {intro.chkpetshopping && (
              <div className="flex gap-1">
                <span>반려동물 동반</span>
                <SafeHtmlRenderer html={intro.chkpetshopping} />
              </div>
            )}
          </div>
        )}
        <ExtraInfo title="할인 정보" content={intro.saleitem} />
        <ExtraInfo title="쇼핑 정보" content={intro.shopguide} />
        <ExtraInfo title="휴게 공간" content={intro.restroom} />
      </InfoLayout.Content>
      <InfoLayout.Footer common={common}></InfoLayout.Footer>
    </InfoLayout>
  );
}
