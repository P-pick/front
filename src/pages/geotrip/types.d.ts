export type Location = {
  latitude: number | null;
  longitude: number | null;
};

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

export type TourItem = {
  contentid: number;
  firstimage?: string;
  firstimage2?: string;
  mapx?: number;
  mapy?: number;
  title: string;
  dist: string;
};

export type TourDetailImage = { imgname: string; originimgurl: string };

export type TourDetailResponse = {
  overview: string;
  images?: TourDetailImage[];
};

export type TourItemWithDetail = TourItem & {
  overview: string;
  images: TourDetailImage[];
};

export type TransportMode = 'transit' | 'car' | 'walk';
