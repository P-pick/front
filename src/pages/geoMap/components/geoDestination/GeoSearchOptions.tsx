import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { PolyFeatures } from '../../types';
import DestinationDetail from './DestinationDetail';
import { useStore } from 'zustand';
import { useTransportation } from '../../store';

interface DestinationDetailProps {
  features: PolyFeatures;
}

export default function GeoSearchOptions({ features }: DestinationDetailProps) {
  const { setSearchOptions } = useStore(useTransportation);

  const contentOptions = [
    {
      searchId: 0,
      name: '추천',
    },
    { searchId: 4, name: '추천 + 대로우선' },
    { searchId: 10, name: '최단거리' },
    { searchId: 30, name: '최단거리 + 계산제외' },
  ];

  return (
    <div className="absolute bottom-0 left-0 z-(--z-layer2) w-full h-1/5 py-3">
      <Swiper
        direction="horizontal"
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        className="px-2 cursor-grab"
      >
        {contentOptions.map(option => (
          <SwiperSlide
            key={option.searchId}
            className="!w-auto mx-2 min-w-35"
            onClick={() => setSearchOptions(option.searchId)}
          >
            <DestinationDetail
              searchId={option.searchId}
              searchName={option.name}
              features={features}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
