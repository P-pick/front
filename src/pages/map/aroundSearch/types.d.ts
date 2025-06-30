import type { TourSummary } from '@/pages/tour/geotrip/types';
import type { AroundContentTypeId } from '@pages/types';

export type MarkerType = {
  contentTypeId: AroundContentTypeId;
  imageSrc: string;
  altText: string;
};

export type AroundTourInfo = TourSummary;
