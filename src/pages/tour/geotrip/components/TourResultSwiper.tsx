import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import TourSlide from './TourSlide';
import type { GeoTripLocation } from '@/pages/types';
import { useGeoLocationBasedTourQuery } from '../../service';
import { BottomSheet } from '@/components';
import { TourDetail } from './';
import type { TourSummary } from '../types';
import { SideButtonGroup } from './SideButtonGroup';
import type { Swiper as SwiperType } from 'swiper/types';
import { withGeoTripParams } from '@/pages/tour/components';
interface TourResultSwiperProps {
  location: GeoTripLocation;
  distance: string;
  tourType: number;
}
function TourResultSwiper({
  location,
  distance,
  tourType,
}: TourResultSwiperProps) {
  const { data, fetchNextPage, hasNextPage } = useGeoLocationBasedTourQuery({
    location,
    radius: distance,
    contentTypeId: tourType,
  });
  const [showDetail, setShowDetail] = useState(false);
  const slides = useMemo(() => data.pages.flatMap(page => page.items), [data]);
  const [currentTourInfo, setCurrentTourInfo] = useState<TourSummary>({
    dist: slides[0].dist,
    overview: slides[0].overview,
    title: slides[0].title,
  });

  const handleSlideChange = (swiper: SwiperType) => {
    const current = slides[swiper.realIndex];
    if (current) {
      setCurrentTourInfo({
        dist: current.dist,
        overview: current.overview,
        title: current.title,
      });
    }
  };

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
      <SideButtonGroup {...currentTourInfo} />
      <div className="absolute w-full h-8/10 bottom-0 left-0">
        <BottomSheet
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
          initialY="20%"
          minHeight={800}
        >
          <BottomSheet.Content>
            <TourDetail {...currentTourInfo} />
          </BottomSheet.Content>
          <BottomSheet.Footer>
            <div className="absolute left-0 bottom-0 bg-gradient-to-t from-white to-white/90 w-full h-full flex justify-center items-center">
              <button
                type="button"
                className="bg-gradient-to-r from-primary-orange to-primary-red rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] shadow-[0_4px_16px_0_rgba(250,129,47,0.3)]"
              >
                여행 시작하기
              </button>
            </div>
          </BottomSheet.Footer>
        </BottomSheet>
      </div>
    </>
  );
}

export default withGeoTripParams(TourResultSwiper);
