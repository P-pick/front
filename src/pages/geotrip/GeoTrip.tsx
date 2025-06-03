import { DistanceTimeInfo, TransportList } from './ui';
import { useState } from 'react';
import type { TransportMode } from './types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import useGetLocationBasedData from './service/getLocationBasedData';
import GeoTripHeader from '@/pages/geotrip/ui/GeoTripHeader';

export default function GeoTrip() {
  const [transportMode, setTransportMode] = useState<TransportMode>('walk');
  const { data } = useGetLocationBasedData();
  if (!data) return <div>Loading</div>;

  return (
    <div className="flex flex-col h-full overflow-y-hidden">
      <div className="h-full w-full relative">
        <GeoTripHeader />
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-0" />
        {/* Outer Vertical Swiper */}
        <Swiper
          direction="vertical"
          modules={[Navigation, Pagination, Mousewheel]}
          pagination={false}
          className="h-full"
        >
          {data.pages[0].items.map((slide, index) => (
            <SwiperSlide key={slide.contentid}>
              <div className="relative text-white w-full h-full  flex flex-col items-center">
                <Swiper
                  direction="horizontal"
                  modules={[Pagination]}
                  className="w-full h-full relative my-swiper"
                  pagination={{
                    clickable: true,
                  }}
                >
                  {[slide.firstimage, slide.firstimage2]
                    .filter(Boolean)
                    .map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img}
                          alt={`Slide ${index}-${i}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>

                <div className="w-full absolute z-10 bottom-0 left-0 px-4">
                  <h1 className="text-2xl font-bold">{slide.title}</h1>
                  <div className="flex justify-between">
                    <DistanceTimeInfo />
                    <TransportList
                      transportMode={transportMode}
                      setTransportMode={setTransportMode}
                    />
                  </div>
                  <div className="mt-7" />
                  <p>설명 어쩌구저쩌구임시설명 나중에추가하기</p>
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
