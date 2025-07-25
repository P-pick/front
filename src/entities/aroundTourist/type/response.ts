import type { TourItem } from '@/entities/tour';

export type GetSelectedPinDetailResponse = Promise<{
  items: {
    item: TourItem[];
  };
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}>;
