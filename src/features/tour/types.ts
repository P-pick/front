import type { AroundContentTypeId, TourItem } from '@/entities/tour';
import type { GeoTripLocation } from '@/shared';

export type TourItemWithDetailImages = TourItem & {
  images: TourDetailImage[];
};

export type TourSummary = Pick<
  TourItemWithDetailImages,
  | 'title'
  | 'dist'
  | 'mapx'
  | 'mapy'
  | 'contenttypeid'
  | 'contentid'
  | 'firstimage'
>;

export type SlideEntries = {
  slide: TourItem;
  pageParam: number;
};

export type LocationBasedInfiniteQueryParams = {
  location: GeoTripLocation;
  contentTypeId: AroundContentTypeId;
  radius: string;
  initialPageParam?: number;
};

export type TourDetailImage = {
  imgname?: string;
  originimgurl?: string;
  serialnum: string;
};
