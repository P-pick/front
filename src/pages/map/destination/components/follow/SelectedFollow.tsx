import { useMemo } from 'react';
import { useTransportation } from '../../store';
import type { PolyFeatures } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { DeleteIcon } from '@/assets';
import { pedestrianFollowInfo } from '@/pages/const/FOLLOW';
import { getSelectedTransportationFollow } from '../../lib';
import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';
import { useMap } from 'react-kakao-maps-sdk';

interface SelectedFollowProps {
  followFeatures: PolyFeatures;
}

export default function SelectedFollow({
  followFeatures,
}: SelectedFollowProps) {
  const { vehicle, searchOptions } = useTransportation();
  const { setIsFollowAlong } = useStore(useFollowAlong);
  const map = useMap();

  const followList = useMemo(() => {
    return getSelectedTransportationFollow(vehicle, followFeatures);
  }, [vehicle, followFeatures]);

  const getStartAndEndIndex = (index: number) => {
    if (index === 0) {
      return 'S';
    } else if (index === followList.length - 1) {
      return 'E';
    } else {
      return index;
    }
  };

  const handleFollowEachIndex = (position: { lat: number; lng: number }) => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(position.lat, position.lng));
    }
    map.setLevel(3, { animate: { duration: 500 } });
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-3/14 py-4 z-(--z-layer2)">
      <Swiper
        direction="horizontal"
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        className="px-2 cursor-grab h-full"
      >
        {followList.map((option, idx) => (
          <>
            <SwiperSlide
              key={option.id}
              className="mx-2 min-w-60 max-w-60"
              onClick={() => handleFollowEachIndex(option.path[0])}
            >
              <div className="w-full h-full border-2 border-(--color-primary-red) bg-(--color-primary-red) rounded-2xl p-2 flex flex-col items-start justify-center gap-2">
                <div className="flex gap-2">
                  <div>
                    <span>{pedestrianFollowInfo[option.turnType].svg}</span>
                  </div>
                  <span className="flex justify-center items-center rounded-full bg-white text-black text-xs w-6 h-6 p-1">
                    {getStartAndEndIndex(idx)}
                  </span>
                </div>
                <p className="flex-1 text-xs text-white">
                  {option.description}
                </p>
              </div>
              <div className="absolute right-5 top-3 cursor-pointer z-(--z-layer4) fill-white">
                <DeleteIcon onClick={() => setIsFollowAlong(false)} />
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
