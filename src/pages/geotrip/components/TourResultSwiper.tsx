import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import TourSlide from './TourSlide';
import type { GeoTripLocation } from '@/pages/geotrip/types';
import { useGeoLocationBasedTourQuery } from '../service';

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
  const slides = useMemo(() => data.pages.flatMap(p => p.items), [data]);

  return (
    <>
      <Swiper
        direction="vertical"
        modules={[Navigation, Pagination, Mousewheel]}
        pagination={false}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        onReachEnd={() => hasNextPage && fetchNextPage()}
        className="h-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.contentid}>
            <TourSlide tourInfo={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
