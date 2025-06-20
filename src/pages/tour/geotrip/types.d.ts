import type { TourItemWithDetail } from '@/pages/types';

export type TourSummary = Pick<
  TourItemWithDetail,
  'title' | 'dist' | 'overview'
>;
