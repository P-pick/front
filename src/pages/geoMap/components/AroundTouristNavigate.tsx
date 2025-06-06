import { markerImageMap, markerList } from '@/pages/const/MARKER';
import type { AroundContentTypeId, MarkerType } from '../types';
import clsx from 'clsx';
import { use, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import useAroundTouristMapMutation from '../service/getAroundTouristMapData';
import type { TourItem } from '@/pages/types';

interface AroundTouristNavigateProps {
  setAroundTouristObjects: React.Dispatch<
    React.SetStateAction<TourItem[] | undefined>
  >;
}

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function AroundTouristNavigate({
  setAroundTouristObjects,
}: AroundTouristNavigateProps) {
  const [contentTypeIdGroup, setContentTypeIdGroup] = useState<MarkerType[]>([
    { contentTypeId: '12', imageSrc: markerImageMap['12'], altText: '관광지' },
  ]);

  const [isMarkerSelectedMenuOpen, setMarkerSelectedMenuOpen] = useState(false);

  const markerClass = (contentTypeId: AroundContentTypeId) =>
    clsx(
      'flex items-center justify-center cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold bg-gray-100 my-1',
      contentTypeIdGroup.find(maker => maker.contentTypeId === contentTypeId)
        ? 'bg-gray-300'
        : 'bg-gray-100'
    );

  const handleOpenSelectedMarkerMenu = () => {
    setMarkerSelectedMenuOpen(prev => !prev);
  };

  const additionalMakerFilter = useAroundTouristMapMutation();

  useEffect(() => {
    // 초기 관광지 데이터 로드
    additionalMakerFilter.mutate(
      {
        location: {
          latitude: destination.lat,
          longitude: destination.lng,
        },
        contentTypeId: '12', // 기본 관광지 타입
      },
      {
        onSuccess: data => {
          setAroundTouristObjects(data.items.item);
        },
      }
    );
  }, []);

  const handleAdditionalMarkerClick = (contentTypeId: AroundContentTypeId) => {
    additionalMakerFilter.mutate(
      {
        location: {
          latitude: destination.lat,
          longitude: destination.lng,
        },
        contentTypeId: contentTypeId,
      },
      {
        onSuccess: data => {
          setAroundTouristObjects(prev => {
            if (!prev) return data.items.item;
            const newItems = data.items.item.filter(
              item =>
                !prev.some(existing => existing.contentid === item.contentid)
            );
            return [...prev, ...newItems];
          });
          setContentTypeIdGroup(prev => {
            const existingType = prev.find(
              item => item.contentTypeId === contentTypeId
            );
            if (existingType) return prev; // 이미 존재하는 타입은 추가하지 않음
            const newMarker = markerList.find(
              marker => marker.contentTypeId === contentTypeId
            );
            if (!newMarker) return prev; // 해당 타입이 없으면 기존 상태 유지
            return [...prev, newMarker];
          });
        },
      }
    );
  };

  const removeMakerFilter = (contentTypeId: AroundContentTypeId) => {
    setContentTypeIdGroup(prev =>
      prev.filter(marker => marker.contentTypeId !== contentTypeId)
    );
    setAroundTouristObjects(prev =>
      prev?.filter(item => item.contenttypeid !== contentTypeId)
    );
  };

  return (
    <div className="absolute top-0 left-0 w-full h-14 bg-white z-[var(--z-layer2)]">
      <div className="flex items-center justify-between h-full gap-3">
        <div
          className="bg-gray-100 p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
          onClick={handleOpenSelectedMarkerMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M5.25192 12C5.03997 12 4.8623 11.9281 4.71892 11.7844C4.57554 11.6406 4.50385 11.4625 4.50385 11.25V6.75L0.165017 1.2C-0.0220022 0.95 -0.050055 0.6875 0.0808581 0.4125C0.211771 0.1375 0.439311 0 0.763476 0H11.2365C11.5607 0 11.7882 0.1375 11.9191 0.4125C12.0501 0.6875 12.022 0.95 11.835 1.2L7.49615 6.75V11.25C7.49615 11.4625 7.42446 11.6406 7.28108 11.7844C7.1377 11.9281 6.96003 12 6.74807 12H5.25192ZM6 6.225L9.70297 1.5H2.29703L6 6.225Z"
              fill="#2D2D2D"
            />
          </svg>
        </div>
        {isMarkerSelectedMenuOpen && (
          <div className="absolute top-12 left-3 bg-white p-2 rounded-xl shadow-2xl">
            <div className="flex-col">
              {markerList.map(marker => (
                <button
                  className={markerClass(marker.contentTypeId)}
                  onClick={() =>
                    handleAdditionalMarkerClick(marker.contentTypeId)
                  }
                >
                  {marker.altText}
                </button>
              ))}
            </div>
          </div>
        )}
        <Swiper
          direction="horizontal" // ← 세로 말고 가로
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView="auto"
          spaceBetween={8} // 요소 간 여백
          className="flex-1 px-2 cursor-grab"
        >
          {contentTypeIdGroup.map(marker => (
            <SwiperSlide key={marker.contentTypeId} className="!w-auto">
              <button
                className="bg-gray-100 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap mr-2 cursor-pointer"
                onClick={() => removeMakerFilter(marker.contentTypeId)}
              >
                {marker.altText}
                <span className="ml-2 font-medium">X</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
