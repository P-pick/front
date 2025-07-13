import { commonSVG } from '@/assets';
import { DistanceTimeInfo } from '@/components';

import type { TourItemWithDetailImages } from '@/pages/tour/types';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStartTrip } from '../lib';

interface TourSlideProps {
  tourInfo: TourItemWithDetailImages;
  handleDetailOpen: () => void;
}

export default function TourSlide({
  tourInfo,
  handleDetailOpen,
}: TourSlideProps) {
  const { handleStartTrip } = useStartTrip();

  return (
    <article className="relative text-white w-full h-full flex flex-col items-center">
      <Swiper
        direction="horizontal"
        modules={[Pagination]}
        className="w-full h-full relative my-swiper"
        pagination={{ clickable: true }}
      >
        {tourInfo.images.length === 0 ? (
          <p className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-(--z-layer5) text-black">
            준비된 이미지가 없습니다.
          </p>
        ) : (
          tourInfo.images.map(img => (
            <SwiperSlide key={img.serialnum}>
              <img
                src={img.originimgurl || undefined}
                alt={img.imgname}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <footer className="w-full absolute z-(--z-layer2) bottom-0 left-0 px-4">
        <header>
          <div className="flex gap-1 items-center">
            <h1 className="text-2xl font-bold max-w-60">{tourInfo.title}</h1>
            <commonSVG.InfoIcon
              className="text-white cursor-pointer"
              onClick={handleDetailOpen}
            />
          </div>
          <div className="flex justify-between">
            <DistanceTimeInfo dist={tourInfo.dist} iconFill="white" />
          </div>
        </header>
        <div className="mt-6" />
        <nav className="w-full flex justify-center">
          <button
            type="button"
            className="mb-[24px] bg-white rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] cursor-pointer"
            onClick={() =>
              handleStartTrip({
                lat: tourInfo.mapy,
                lng: tourInfo.mapx,
              })
            }
          >
            여행 시작하기
          </button>
        </nav>
      </footer>

      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-(--z-layer1)" />
    </article>
  );
}
