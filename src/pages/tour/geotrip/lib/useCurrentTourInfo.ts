import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import type { TourSummary } from '../types';

const useCurrentTourInfo = (slides: TourSummary[]) => {
  const [currentTourInfo, setCurrentTourInfo] = useState<TourSummary>(() => ({
    dist: slides[0].dist,
    title: slides[0].title,
    contentid: slides[0].contentid,
    mapx: slides[0].mapx,
    mapy: slides[0].mapy,
    contenttypeid: slides[0].contenttypeid,
    firstimage: slides[0].firstimage,
  }));

  const handleSlideChange = (swiper: SwiperType) => {
    const current = slides[swiper.realIndex];
    if (current) {
      setCurrentTourInfo({
        dist: current.dist,
        title: current.title,
        contentid: current.contentid,
        mapx: current.mapx,
        mapy: current.mapy,
        contenttypeid: current.contenttypeid,
        firstimage: current.firstimage,
      });
    }
  };

  return { currentTourInfo, handleSlideChange };
};

export default useCurrentTourInfo;
