import type { TourItemWithDetailImages } from '@/pages/tour/types';

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
