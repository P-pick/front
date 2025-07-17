import { withGeoTripParams } from '@/pages/tour/components';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { useState } from 'react';
import { Mousewheel, Navigation, Pagination, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { persistSlideSession, useInfiniteSwiperControl } from '../lib';
import { useTourSwiperBasedData } from '../service';
import { TourBottomSheet } from './';
import { SideButtonGroup } from './SideButtonGroup';
import TourSlide from './TourSlide';

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
  const { slideEntries, append, prepend, isFetchingPreviousPage } =
    useTourSwiperBasedData({
      location,
      radius: distance,
      contentTypeId: tourContentTypeId,
    });
  const [showDetail, setShowDetail] = useState(false);
  const { swiperRef, onSwiper, handlePrepend, handleAppend } =
    useInfiniteSwiperControl({
      prepend,
      append,
    });
  const currentSlideEntries = slideEntries[swiperRef.current?.activeIndex ?? 0];
  const currentSlide = currentSlideEntries.slide;
  const handleSlideChange = persistSlideSession(currentSlideEntries);

  return (
    <>
      {isFetchingPreviousPage && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 z-50">
          <div className="text-white">Loading...</div>
        </div>
      )}

      <Swiper
        direction="vertical"
        watchSlidesProgress
        modules={[Navigation, Pagination, Mousewheel, Virtual]}
        pagination={false}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        className="h-full"
        onSwiper={onSwiper}
        onSlideChange={swiper => {
          handleSlideChange(swiper);
        }}
        onReachEnd={handleAppend}
        onReachBeginning={handlePrepend}
        virtual
      >
        {slideEntries.map(({ slide }, index) => (
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
