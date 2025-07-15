import { withGeoTripParams } from '@/pages/tour/components';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mousewheel, Navigation, Pagination, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTourSwiperBasedData } from '../service';
import { TourBottomSheet } from './';
import { SideButtonGroup } from './SideButtonGroup';
import TourSlide from './TourSlide';
import { useCurrentSlideInfo } from '../lib';
import type { Swiper as SwiperType } from 'swiper/types';
interface TourResultSwiperProps {
  location: GeoTripLocation;
  distance: string;
  tourContentTypeId: AroundContentTypeId;
}

function TourResultSwiper({
  location,
  distance,
  tourContentTypeId,
}: TourResultSwiperProps) {
  const saved = sessionStorage.getItem('tour-swiper-cache');
  const swiperRef = useRef<SwiperType | null>(null);
  const parsedCache = useMemo(
    () => (saved ? JSON.parse(saved) : undefined),
    [saved],
  );

  const {
    slides,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useTourSwiperBasedData({
    location,
    radius: distance,
    contentTypeId: tourContentTypeId,
    initialData: parsedCache,
  });
  const [showDetail, setShowDetail] = useState(false);
  const { handleSlideChange, currentSlide } = useCurrentSlideInfo(slides);

  const onSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    if (hasPreviousPage) {
      fetchPreviousPage();
      console.log('이전 페이지를 가져옵니다.');
    }
  };
  useEffect(() => {
    if (!isFetchingPreviousPage) {
      if (swiperRef.current) swiperRef.current.slideTo(slides.length - 1, 0);
    }
  }, [isFetchingPreviousPage]);

  return (
    <>
      <Swiper
        direction="vertical"
        modules={[Navigation, Pagination, Mousewheel, Virtual]}
        pagination={false}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        className="h-full"
        touchMoveStopPropagation={false}
        onSlideChange={handleSlideChange}
        onTouchEnd={swiper => {
          if (swiper.realIndex === slides.length - 1) {
            if (hasNextPage) fetchNextPage();
          } else if (swiper.realIndex === 0) {
            if (hasPreviousPage) fetchPreviousPage();
          }
          console.log('현재 슬라이드 인덱스:', swiper.realIndex);
        }}
        onSwiper={onSwiper}
        virtual
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.contentid} virtualIndex={index}>
            <TourSlide
              tourInfo={slide}
              handleDetailOpen={() => setShowDetail(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SideButtonGroup goToAroundTouristButtonProps={currentSlide} />
      <TourBottomSheet
        {...currentSlide}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}

export default withGeoTripParams(TourResultSwiper);
