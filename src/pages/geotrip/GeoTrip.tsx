import { BackButton, DistanceTimeInfo, MenuIcon, TransportList } from './ui';
import { useMemo, useState } from 'react';
import type { TransportMode } from './types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import {
  useInfiniteLocationBasedTourQuery,
  useTourDetailQuery,
} from './service';
import { truncate } from './lib';

export default function GeoTrip() {
  const [transportMode, setTransportMode] = useState<TransportMode>('walk');
  const { data, fetchNextPage, hasNextPage } =
    useInfiniteLocationBasedTourQuery();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.items);
  }, [data]);

  const currentSlide = slides ? slides[currentSlideIndex] : null;
  const { data: detailData } = useTourDetailQuery(currentSlide?.contentid);

  if (!data || !detailData) return <div>Loading</div>;

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
          onSlideChange={swiper => {
            setCurrentSlideIndex(swiper.activeIndex);
          }}
          className="h-full"
          onReachEnd={() => hasNextPage && fetchNextPage()}
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.contentid}>
              <div className="relative text-white w-full h-full flex flex-col items-center">
                <Swiper
                  direction="horizontal"
                  modules={[Pagination]}
                  className="w-full h-full relative my-swiper"
                  pagination={{
                    clickable: true,
                  }}
                >
                  {!detailData.images ? (
                    <span>준비된 이미지가 업습미다</span>
                  ) : (
                    detailData.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img.originimgurl}
                          alt={img.imgname}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))
                  )}
                </Swiper>
                <div className="w-full absolute z-(--z-layer2) bottom-0 left-0 px-4">
                  <h1 className="text-2xl font-bold">{slide.title}</h1>
                  <div className="flex justify-between">
                    <DistanceTimeInfo />
                    <TransportList
                      transportMode={transportMode}
                      setTransportMode={setTransportMode}
                    />
                  </div>
                  <div className="mt-7" />
                  <p>{truncate(detailData.overview, { length: 60 })}</p>
                  <div className="mt-16" />
                  <div className="w-full flex justify-center">
                    <button
                      type="button"
                      className="mb-[24px] bg-white rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px]"
                    >
                      여행 시작하기
                    </button>
                  </div>
                </div>
                <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-(--z-layer1)" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
