import { withGeoTripParams } from '@/pages/tour/components';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { useRef, useState } from 'react';
import { Mousewheel, Navigation, Pagination, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import { useCurrentSlideInfo } from '../lib';
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
  const swiperRef = useRef<SwiperType | null>(null);

  const {
    slides,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
  } = useTourSwiperBasedData({
    location,
    radius: distance,
    contentTypeId: tourContentTypeId,
  });

  const [showDetail, setShowDetail] = useState(false);
  const { handleSlideChange, currentSlide } = useCurrentSlideInfo(slides);

  const append = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const prepend = async () => {
    if (!hasPreviousPage || !swiperRef.current) return;
    const result = await fetchPreviousPage();
    if (result.data) {
      swiperRef.current.slideTo(result.data.pages[0]?.items.item.length, 0);
    }
  };

  const onSwiper = async (swiper: SwiperType) => {
    swiperRef.current = swiper;
    if (!hasPreviousPage || !swiperRef.current) return;
    const result = await fetchPreviousPage();
    if (result.data) {
      swiperRef.current.slideTo(result.data.pages[0]?.items.item.length, 0);
    }
  };

  return (
    <>
      {isFetchingPreviousPage && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 z-50">
          <div className="text-white">Loading...</div>
        </div>
      )}

      <Swiper
        direction="vertical"
        modules={[Navigation, Pagination, Mousewheel, Virtual]}
        pagination={false}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        className="h-full"
        onSwiper={onSwiper}
        onSlideChange={handleSlideChange}
        onReachEnd={append}
        onReachBeginning={prepend}
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
