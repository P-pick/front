import { truncate } from '@/pages/geotrip/lib';
import { DistanceTimeInfo } from './';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { TourItemWithDetail } from '@/pages/types';

interface TourSlideProps {
  tourInfo: TourItemWithDetail;
}

export default function TourSlide({ tourInfo }: TourSlideProps) {
  return (
    <div className="relative text-white w-full h-full flex flex-col items-center">
      <Swiper
        direction="horizontal"
        modules={[Pagination]}
        className="w-full h-full relative my-swiper"
        pagination={{
          clickable: true,
        }}
      >
        {tourInfo.images.length === 0 ? (
          <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-(--z-layer5) text-black ">
            준비된 이미지가 없습니다.
          </span>
        ) : (
          tourInfo.images.map(img => (
            <SwiperSlide key={img.serialnum}>
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
        <h1 className="text-2xl font-bold">{tourInfo.title}</h1>
        <div className="flex justify-between">
          <DistanceTimeInfo dist={tourInfo.dist} />
        </div>
        <div className="mt-7" />
        <p>{truncate(tourInfo.overview, { length: 60 })}</p>
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
  );
}
