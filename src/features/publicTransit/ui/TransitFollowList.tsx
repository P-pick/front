import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { useSwiperFollowList } from '@/features/navigate';
import {
  getPublicTransitFollowList,
  PublicTransitFollowElement,
} from '@/features/publicTransit';

import type { PUBLICTRANSIT } from '@/entities/navigate';

interface TransitFollowListProps {
  itinerary: PUBLICTRANSIT.Itinerary;
}

export default function TransitFollowList({
  itinerary,
}: TransitFollowListProps) {
  const followList = getPublicTransitFollowList(itinerary);

  const {
    swiperRef,
    handleSlideChange,
    handleSwitchPositionAndSwiperToCurrentIndex,
  } = useSwiperFollowList({ followList, start: followList[0].path[0] });

  if (followList === undefined) {
    return null;
  }

  return (
    <div className="py-2 z-(--z-layer2)">
      <Swiper
        direction="horizontal"
        modules={[Navigation, Pagination]}
        freeMode={true}
        slidesPerView="auto"
        className="px-2 cursor-grab active:cursor-grabbing"
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onRealIndexChange={handleSlideChange}
      >
        {followList.map((option, idx) => (
          <>
            <SwiperSlide
              key={option?.id}
              className="mx-2 max-w-60"
              onClick={() =>
                handleSwitchPositionAndSwiperToCurrentIndex(
                  option?.path[0],
                  idx,
                )
              }
            >
              <PublicTransitFollowElement
                key={option?.id}
                option={option}
                idx={idx + 1}
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
