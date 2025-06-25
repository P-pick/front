import { useMemo } from 'react';
import { getSelectedTransportationPolylines } from '../../lib';
import { useTransportation } from '../../store';
import type { PolyFeatures } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

interface SelectedFollowProps {
  followFeatures: PolyFeatures;
}

export default function SelectedFollow({
  followFeatures,
}: SelectedFollowProps) {
  const { vehicle, searchOptions } = useTransportation();

  const followList = useMemo(() => {
    return getSelectedTransportationPolylines(vehicle, followFeatures);
  }, [vehicle, followFeatures]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-1/6 p-4 bg-white z-(--z-layer2)">
      <Swiper
        direction="horizontal"
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        className="px-2 cursor-grab h-full"
      >
        {followList.map(option => (
          <SwiperSlide key={option.id} className="!w-auto mx-2 min-w-60 ">
            <div className="w-full h-full border-2 border-(--color-primary-red) rounded-2xl p-2">
              {option.index}
              {option.turnType}
              {option.description}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
