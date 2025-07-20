import { Swiper, SwiperSlide } from 'swiper/react';
import type { CarMultiplePathResponse } from '../../types';
import { FreeMode } from 'swiper/modules';
import { useStore } from 'zustand';
import { useTransportation } from '../../store';
import CarOptionDetail from './CarOptionDetail';

interface CarOptionsProps {
  options: CarMultiplePathResponse[];
}

export default function CarOptions({ options }: CarOptionsProps) {
  const { setSearchOptions } = useStore(useTransportation);

  return (
    <div className="absolute bottom-10 left-0 z-(--z-layer2) w-full h-1/5 py-3">
      <Swiper
        direction="horizontal"
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        className="px-2 cursor-grab"
      >
        {options.map(option => (
          <SwiperSlide
            key={option.optionId}
            className="!w-auto mx-2 min-w-35"
            onClick={() => setSearchOptions(option.optionId)}
          >
            <CarOptionDetail
              optionId={option.optionId}
              name={option.name}
              features={option.features}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
