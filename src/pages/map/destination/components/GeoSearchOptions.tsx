import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import DestinationDetail from './DestinationDetail';
import { useStore } from 'zustand';
import { useTransportation } from '../store';
import type { MultiplePathResponse } from '../types';

interface DestinationDetailProps {
  features: MultiplePathResponse[];
}

export default function GeoSearchOptions({ features }: DestinationDetailProps) {
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
        {features.map(option => (
          <SwiperSlide
            key={option.optionId}
            className="!w-auto mx-2 min-w-35"
            onClick={() => setSearchOptions(option.optionId)}
          >
            <DestinationDetail
              searchId={option.optionId}
              searchName={option.name}
              features={option.features}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
