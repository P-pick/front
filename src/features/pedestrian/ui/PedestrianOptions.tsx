import { useStore } from 'zustand';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import { useTransportationStore } from '@/features/navigate';
import { PedestrianOptionDetail } from '@/features/pedestrian';

import type { PEDESTRIAN } from '@/entities/navigate';

interface PedestrianOptionsProps {
  options: PEDESTRIAN.PedestrianMultiplePathResponse[];
}

export default function PedestrianOptions({ options }: PedestrianOptionsProps) {
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
            <PedestrianOptionDetail
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
