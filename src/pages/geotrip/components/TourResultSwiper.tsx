import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import TourSlide from './TourSlide';
import type { GeoTripLocation } from '@/pages/types';
import { useGeoLocationBasedTourQuery } from '../service';
import { BottomSheet } from '@/components';
import { TourDetail } from './';
import type { TourSummary } from '@/pages/geotrip/types';
import { SideButtonGroup } from './SideButtonGroup';

interface TourResultSwiperProps {
  location: GeoTripLocation;
  distance: string;
  tourType: number;
}

export default function TourResultSwiper({
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
  const [currentTourInfo, setCurrentTourInfo] = useState<TourSummary>({
    dist: '',
    overview: '',
    title: '',
  });

  const slides = useMemo(() => data.pages.flatMap(p => p.items), [data]);
  const handleSlideClick = (slide: TourSummary) => {
    setCurrentTourInfo(slide);
    setShowDetail(true);
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
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.contentid}>
            <TourSlide tourInfo={slide} handleSlideClick={handleSlideClick} />
          </SwiperSlide>
        ))}
      </Swiper>
      <SideButtonGroup />
      <div className="absolute w-full h-full bottom-0 left-0">
        <BottomSheet
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
          initialY="55%"
          minHeight={650}
        >
          <BottomSheet.Content>
            <TourDetail
              dist={currentTourInfo.dist}
              overview={currentTourInfo.overview}
              title={currentTourInfo.title}
            />
          </BottomSheet.Content>
          <BottomSheet.Footer>
            <button
              type="button"
              className="absolute left-1/2 bottom-6 -translate-x-1/2 bg-gradient-to-r from-[#FA812F] to-[#FA4032] rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] shadow-[0_4px_16px_0_rgba(250,129,47,0.3)]"
            >
              여행 시작하기
            </button>
          </BottomSheet.Footer>
        </BottomSheet>
      </div>
    </>
  );
}
