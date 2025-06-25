import type { AroundContentTypeId } from './map/aroundSearch/types';

export type ApiResponse<T> = {
  response: { header: ResponseHeader; body: ResponseBody<T> };
};

export type ResponseHeader = {
  resultCode: string;
  resultMsg: string;
};

export type ResponseBody<T> = {
  resultCode: string;
  resultMsg: string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: { item: T };
};

export type GeoTripLocation = {
  lat: number;
  lng: number;
};

export type TourItem = {
  addr1?: string;
  addr2?: string;
  areacode?: number;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  contentid: number;
  contenttypeid: AroundContentTypeId;
  createdtime: string;
  dist: string;
  firstimage?: string;
  firstimage2?: string;
  cpyrhtDivCd?: string;
  mapx?: number;
  mapy?: number;
  mlevel?: number;
  modifiedtime: string;
  sigungucode?: number;
  tel?: string;
  title: string;
  lDongRegnCd?: string;
  lDongSignguCd?: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  lclsSystm3?: string;
  zipcode?: string;
};

export type TourDetailImage = {
  imgname?: string;
  originimgurl?: string;
  serialnum: string;
};

export type TourDetailResponse = {
  overview: string;
  images?: TourDetailImage[];
};

export type TourItemWithDetail = TourItem & {
  images: TourDetailImage[];
};
