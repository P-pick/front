export type Location = {
  latitude: number | null;
  longitude: number | null;
};

export type ApiResponse = {
  response: { header: ResponseHeader; body: ResponseBody };
};

export type ResponseHeader = {
  resultCode: string;
  resultMsg: string;
};

export type ResponseBody = {
  resultCode: string;
  resultMsg: string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: { item: Item[] };
};

export type Item = {
  addr1?: string;
  addr2?: string;
  areacode?: number;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  contentid: number;
  contenttypeid: number;
  createdtime: string;
  dist: number;
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

export type TransportMode = 'transit' | 'car' | 'walk';
