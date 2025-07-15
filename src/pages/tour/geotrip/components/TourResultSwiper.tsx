import { withGeoTripParams } from '@/pages/tour/components';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { useState } from 'react';
import { Mousewheel, Navigation, Pagination, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTourSwiperBasedData } from '../service';
import { TourBottomSheet } from './';
import { SideButtonGroup } from './SideButtonGroup';
import TourSlide from './TourSlide';
import { useCurrentTourInfo } from '../lib';

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
  const { slides, fetchNextPage, hasNextPage } = useTourSwiperBasedData({
    location,
    distance,
    contentTypeId: tourContentTypeId,
  });
  const [showDetail, setShowDetail] = useState(false);
  const { currentTourInfo, handleSlideChange } = useCurrentTourInfo(slides);

  return (
    <>
      <Swiper
        direction="vertical"
        modules={[Navigation, Pagination, Mousewheel, Virtual]}
        pagination={false}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        onReachEnd={() => hasNextPage && fetchNextPage()}
        className="h-full"
        touchMoveStopPropagation={false}
        onSlideChange={handleSlideChange}
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
      <SideButtonGroup goToAroundTouristButtonProps={currentTourInfo} />
      <TourBottomSheet
        title={currentTourInfo.title}
        dist={currentTourInfo.dist}
        firstimage={currentTourInfo.firstimage}
        contenttypeid={currentTourInfo.contenttypeid}
        isOpen={showDetail}
        contentid={currentTourInfo.contentid}
        mapx={currentTourInfo.mapx}
        mapy={currentTourInfo.mapy}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}

export default withGeoTripParams(TourResultSwiper);
