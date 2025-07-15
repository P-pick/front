import { TourItem } from '@/pages/types';
import type { InfiniteData } from '@tanstack/react-query';
import type { GeoTripLocation } from '@/pages/types';
import type { ResponseBody } from '@/pages/types';
import type { TourDetailImage, AroundContentTypeId } from '@/pages/tour/types';

export type LocationBasedItemRequest = {
  location: GeoTripLocation;
  pageNo: number;
  contentTypeId: AroundContentTypeId;
  radius: string;
};
export type LocationBasedInfiniteQueryParams = {
  initialData?: InfiniteData<ResponseBody<TourItem[]>, number>;
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
