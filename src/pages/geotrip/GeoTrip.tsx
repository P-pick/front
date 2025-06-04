import { TourSlide } from './ui';
import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import { useInfiniteLocationBasedTourQuery } from './service';
import { BackButton, MenuIcon } from '@/components';

export default function GeoTrip() {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteLocationBasedTourQuery();
  const slides = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.items);
  }, [data]);

  if (!data || isLoading) return <div>Loading</div>;
  const onReachEnd = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <div className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)">
          <BackButton />
          <MenuIcon />
        </div>
        <Swiper
          direction="vertical"
          modules={[Navigation, Pagination, Mousewheel]}
          pagination={false}
          mousewheel={{
            enabled: true,
            sensitivity: 1,
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          className="h-full"
          onReachEnd={onReachEnd}
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.contentid}>
              <TourSlide tourInfo={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
