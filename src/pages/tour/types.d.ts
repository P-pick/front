import { TourItem } from '@/pages/types';

export type LocationBasedItemRequest = {
  location: GeoTripLocation | null;
  pageNo: number;
  contentTypeId: AroundContentTypeId;
  radius: string;
};
export type TourDetailImage = {
  imgname?: string;
  originimgurl?: string;
  serialnum: string;
};

export type TourItemWithDetailImages = TourItem & {
  images: TourDetailImage[];
};
