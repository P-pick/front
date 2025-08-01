import { tourDetailSVG } from '@/assets';

import { ExtraInfo, InfoLayout } from '@/features/tourDetail';
import { SafeHtmlRenderer } from '@/shared';

import type { Lodging, TourDetailCommon } from '@/entities/tour';

interface LodgingInfoProps {
  common: TourDetailCommon;
  intro: Lodging;
}

export default function LodgingInfo({ common, intro }: LodgingInfoProps) {
  return (
    <InfoLayout>
      <InfoLayout.Header common={common}>
        {(intro.infocenterlodging || intro.reservationlodging) && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.CallIcon className="w-3 h-3" />
            <div className="flex flex-col gap-1">
              {intro.infocenterlodging && (
                <span>안내 데스크: {intro.infocenterlodging}</span>
              )}
              {intro.reservationlodging && (
                <span>예약 문의: {intro.reservationlodging}</span>
              )}
            </div>
          </div>
        )}
        {intro.parkinglodging && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.ParkingIcon className="w-3 h-3" /> 주차
            <SafeHtmlRenderer html={intro.parkinglodging} />
          </div>
        )}
      </InfoLayout.Header>
      <InfoLayout.Content>
        {(intro.checkintime || intro.checkouttime) && (
          <div>
            <h2 className="text-lg font-bold">이용시간</h2>
            <div className="flex gap-2 text-sm">
              {intro.checkintime && (
                <>
                  체크인 <SafeHtmlRenderer html={intro.checkintime} />
                </>
              )}
              {intro.checkouttime && (
                <>
                  체크아웃 <SafeHtmlRenderer html={intro.checkouttime} />
                </>
              )}
            </div>
          </div>
        )}
        <ExtraInfo title="예약정보" content={intro.reservationurl} />
        <div>
          <h2 className="text-lg font-bold">호텔 정보</h2>
          <div className="flex flex-col gap-1">
            <span>수용가능인원: {intro.accomcountlodging || '정보없음'}</span>
            <span>객실수: {intro.roomcount || '정보 없음'}</span>
            <span>객실유형: {intro.roomtype || '정보 없음'}</span>
            <span>층 수: {intro.scalelodging || '정보 없음'}</span>
            <span>편의시설: {intro.subfacility || '정보 없음'}</span>
          </div>
        </div>
        <ExtraInfo title="식사" content={intro.foodplace} />
        <div>
          <h2 className="text-lg font-bold">부대 시설</h2>
          <div className="grid grid-cols-4 text-sm ">
            {intro.barbecue === '1' && <span>바베큐</span>}
            {intro.beauty === '1' && <span>뷰티 시설</span>}
            {intro.beverage === '1' && <span>식음료장</span>}
            {intro.bicycle === '1' && <span>자전거 대여</span>}
            {intro.campfire === '1' && <span>캠프파이어</span>}
            {intro.karaoke === '1' && <span>노래방</span>}
            {intro.publicbath === '1' && <span>공용 목욕탕</span>}
            {intro.publicpc === '1' && <span>PC방</span>}
            {intro.sauna === '1' && <span>사우나</span>}
            {intro.seminar === '1' && <span>세미나실</span>}
            {intro.sports === '1' && <span>스포츠 시설</span>}
          </div>
        </div>
        <ExtraInfo title="환불 규정" content={intro.refundregulation} />
      </InfoLayout.Content>
      <InfoLayout.Footer common={common}></InfoLayout.Footer>
    </InfoLayout>
  );
}
