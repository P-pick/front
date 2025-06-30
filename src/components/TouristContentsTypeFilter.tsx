import { markerList } from '@/pages/const/MARKER';
import type { AroundContentTypeId } from '@/pages/types';
import clsx from 'clsx';
import { useCallback } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface TouristContentsTypeFilterProps {
  contentTypeId: AroundContentTypeId;
  setContentTypeId: React.Dispatch<React.SetStateAction<AroundContentTypeId>>;
}
export default function TouristContentsTypeFilter({
  contentTypeId,
  setContentTypeId,
}: TouristContentsTypeFilterProps) {
  const getButtonClass = useCallback((isActive: boolean) => {
    return clsx(
      'px-2.5 py-[6px] flex items-center justify-center rounded-2xl border-primary-dark border-2 cursor-pointer',
      {
        'bg-primary-red text-white border-secondary-red': isActive,
      }
    );
  }, []);

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={5}
      freeMode={true}
      direction="horizontal"
      modules={[FreeMode]}
      className="cursor-grab"
    >
      {markerList.map(marker => (
        <SwiperSlide className=" !w-auto " key={marker.contentTypeId}>
          <button
            className={getButtonClass(contentTypeId === marker.contentTypeId)}
            onClick={() => setContentTypeId(marker.contentTypeId)}
          >
            <span className="text-xs">{marker.altText}</span>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
