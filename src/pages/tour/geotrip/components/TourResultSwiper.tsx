import { BottomSheet, LoadingSpinner, TourCard } from '@/components';
import { withGeoTripParams } from '@/pages/tour/components';
import { useTourSwiperData } from '@/pages/tour/geotrip/service/useTourSwiperData';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { Suspense, useState } from 'react';
import { Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import { useStartTrip } from '../lib';
import type { TourSummary } from '../types';
import { TourOverView } from './';
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
  const { slides, fetchNextPage, hasNextPage } = useTourSwiperData({
    location,
    distance,
    contentTypeId: tourContentTypeId,
  });
  const [showDetail, setShowDetail] = useState(false);

  const [currentTourInfo, setCurrentTourInfo] = useState<TourSummary>({
    dist: slides[0].dist,
    title: slides[0].title,
    images: slides[0].images,
    contentid: slides[0].contentid,
    mapx: slides[0].mapx,
    mapy: slides[0].mapy,
    contenttypeid: slides[0].contenttypeid,
  });

  const handleSlideChange = (swiper: SwiperType) => {
    const current = slides[swiper.realIndex];
    if (current) {
      setCurrentTourInfo({
        dist: current.dist,
        title: current.title,
        images: current.images,
        contentid: current.contentid,
        mapx: current.mapx,
        mapy: current.mapy,
        contenttypeid: current.contenttypeid,
      });
    }
  };

  const { handleStartTrip } = useStartTrip();

  return (
    <>
      <Swiper
        direction="vertical"
        modules={[Navigation, Pagination, Mousewheel]}
        pagination={false}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        onReachEnd={() => hasNextPage && fetchNextPage()}
        className="h-full"
        touchMoveStopPropagation={false}
        onSlideChange={handleSlideChange}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.contentid}>
            <TourSlide
              tourInfo={slide}
              handleDetailOpen={() => setShowDetail(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SideButtonGroup goToAroundTouristButtonProps={currentTourInfo} />
      <BottomSheet
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        showOverlay={false}
      >
        <div className="bg-white w-full">
          <TourCard
            title={currentTourInfo.title}
            distance={currentTourInfo.dist}
            imgUrl={currentTourInfo.images[0].originimgurl || ''}
            tourTypeId={currentTourInfo.contenttypeid}
          />
          <Suspense fallback={<LoadingSpinner />}>
            <TourOverView contentId={currentTourInfo.contentid} />
          </Suspense>
          <div className="mt-4  w-full flex items-center justify-center">
            <button
              type="button"
              className="bg-gradient-to-r from-primary-orange to-primary-red rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] shadow-[0_4px_16px_0_rgba(250,129,47,0.3)]"
              onClick={() => {
                handleStartTrip({
                  lng: currentTourInfo.mapx,
                  lat: currentTourInfo.mapy,
                });
              }}
            >
              여행 시작하기
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}

export default withGeoTripParams(TourResultSwiper);
