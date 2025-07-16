import type { AroundContentTypeId, TourDetailImage } from '@/pages/tour/types';
import type { GeoTripLocation } from '@/pages/types';
import { TourItem } from '@/pages/types';

export type LocationBasedItemRequest = {
  location: GeoTripLocation;
  pageNo: number;
  contentTypeId: AroundContentTypeId;
  radius: string;
};
export type LocationBasedInfiniteQueryParams = {
  initialPageParam?: number;
} & Omit<LocationBasedItemRequest, 'pageNo'>;

export type TourDetailImage = {
  imgname?: string;
  originimgurl?: string;
  serialnum: string;
};

export type TourItemWithDetailImages = TourItem & {
  images: TourDetailImage[];
};

export type PickOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
