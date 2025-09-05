import { useStore } from 'zustand';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import { useTransportationStore } from '@/features/navigate';
import { CarOptionDetail } from '@/features/car';

import type { CAR } from '@/entities/navigate';

interface CarOptionsProps {
  options: CAR.CarMultiplePathResponse[];
}

export default function CarOptions({ options }: CarOptionsProps) {
  const { setSearchOptions } = useStore(useTransportationStore);

  return (
    <div className="z-(--z-layer2) pb-3">
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
