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

export type SlideEntries = {
  slide: TourItem;
  pageParam: number;
};
