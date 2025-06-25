import type { TourSummary } from '@/pages/tour/geotrip/types';

export type AroundContentTypeId =
  | '' // 없음
  | '12' // 관광지
  | '14' // 문화시설
  | '15' // 축제공연행사
  | '25' // 여행코스
  | '28' // 레포츠
  | '32' // 숙박
  | '38' // 쇼핑
  | '39'; // 음식점

export type MarkerType = {
  contentTypeId: AroundContentTypeId;
  imageSrc: string;
  altText: string;
};

export type AroundTourInfo = TourSummary;
