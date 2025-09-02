import type { AroundContentTypeId } from '@/entities/tour';

export interface TourDetailCommon {
  contentid: string; // 콘텐츠ID (필수)
  contenttypeid: AroundContentTypeId; // 콘텐츠타입ID (필수)
  createdtime: string; // 등록일 (필수)
  modifiedtime: string; // 수정일 (필수)
  title: string; // 콘텐츠명(제목) (필수)

  homepage?: string; // 홈페이지주소
  tel?: string; // 전화번호
  telname?: string; // 전화번호명
  firstimage?: string; // 대표이미지(원본)
  firstimage2?: string; // 대표이미지(썸네일)
  cpyrhtDivCd?: string; // 저작권 유형

  areacode?: number; // 지역코드
  sigungucode?: number; // 시군구코드
  cat1?: string; // 대분류
  cat2?: string; // 중분류
  cat3?: string; // 소분류

  addr1?: string; // 주소
  addr2?: string; // 상세주소
  zipcode?: string; // 우편번호

  mapx: number; // GPS X좌표
  mapy: number; // GPS Y좌표
  mlevel?: number; // 지도 확대레벨

  overview?: string; // 콘텐츠 개요

  lDongRegnCd?: string; // 법정동 시도 코드
  lDongSignguCd?: string; // 법정동 시군구 코드
  lclsSystm1?: string; // 분류체계 대분류
  lclsSystm2?: string; // 분류체계 중분류
  lclsSystm3?: string; // 분류체계 소분류
}
