export type GeoTripLocation = {
  latitude: number | null;
  longitude: number | null;
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
