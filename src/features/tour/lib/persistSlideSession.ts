import type { SlideEntries } from '../types';

interface PersistSlideSessionProps {
  slideEntries: SlideEntries;
  activeIndex: number;
}
export const persistSlideSession = ({
  slideEntries,
  activeIndex,
}: PersistSlideSessionProps) => {
  sessionStorage.setItem('currentIndex', String(activeIndex % 10));
  sessionStorage.setItem('currentPage', String(slideEntries.pageParam));
};
