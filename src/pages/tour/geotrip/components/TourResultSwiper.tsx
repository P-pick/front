import { Suspense, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import TourSlide from './TourSlide';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import { getGeoLocationBasedTourQueryOptions } from '../../service';
import { BottomSheet, LoadingSpinner, TourCard } from '@/components';
import { TourOverView } from './';
import type { TourSummary } from '../types';
import { SideButtonGroup } from './SideButtonGroup';
import type { Swiper as SwiperType } from 'swiper/types';
import { withGeoTripParams } from '@/pages/tour/components';
import { useStartTrip } from '../lib';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
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
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getGeoLocationBasedTourQueryOptions({
      location,
      radius: distance,
      contentTypeId: tourContentTypeId,
    }),
  );
  const [showDetail, setShowDetail] = useState(false);
  const slides = useMemo(() => data.pages.flatMap(page => page.items), [data]);
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
      <div className="absolute w-full h-full bottom-0 left-0">
        <SideButtonGroup goToAroundTouristButtonProps={currentTourInfo} />
        <div className="absolute w-full h-full bottom-0 left-0">
          <BottomSheet
            isOpen={showDetail}
            onClose={() => setShowDetail(false)}
            initialY="20%"
            minHeight={600}
          >
            <BottomSheet.Content>
              <div className="bg-white w-full h-300">
                <TourCard
                  title={currentTourInfo.title}
                  distance={currentTourInfo.dist}
                  imgUrl={currentTourInfo.images[0].originimgurl || ''}
                />
                <Suspense fallback={<LoadingSpinner />}>
                  <TourOverView contentId={currentTourInfo.contentid} />
                </Suspense>
              </div>
            </BottomSheet.Content>
            <BottomSheet.Footer>
              <div className="absolute left-0 bottom-0 bg-gradient-to-t from-white to-white/90 w-full h-full flex justify-center items-center">
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
            </BottomSheet.Footer>
          </BottomSheet>
        </div>
      </div>
    </>
  );
}

export default withGeoTripParams(TourResultSwiper);
