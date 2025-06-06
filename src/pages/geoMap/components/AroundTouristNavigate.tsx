import { markerList } from '@/pages/const/MARKER';
import type { MarkerType } from '../types';
import clsx from 'clsx';
import { useState } from 'react';
import { Swiper } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

interface AroundTouristNavigateProps {
  contentTypeIdGroup: MarkerType[];
}

export default function AroundTouristNavigate({
  contentTypeIdGroup,
}: AroundTouristNavigateProps) {
  const [isMarkerSelectedMenuOpen, setMarkerSelectedMenuOpen] = useState(false);

  const markerClass = clsx(
    'flex items-center justify-center cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold bg-gray-100 my-1'
  );

  const handleOpenSelectedMarkerMenu = () => {
    setMarkerSelectedMenuOpen(prev => !prev);
  };

  return (
    <div className="absolute top-0 left-0 w-full  h-14 bg-white z-[var(--z-layer2)]">
      <div className="flex items-center justify-between h-full px-4 gap-3">
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
                <button className={markerClass}>{marker.altText}</button>
              ))}
            </div>
          </div>
        )}
        <Swiper
          direction={'horizontal'}
          modules={[FreeMode]}
          freeMode={true}
          scrollbar={{ draggable: true }}
          slidesPerView="auto"
          className="!flex-row justify-start items-center w-full overflow-hidden"
        >
          {contentTypeIdGroup.map(marker => (
            <button key={marker.contentTypeId} className={markerClass}>
              {marker.altText}
              <button className="ml-2 font-medium">X</button>
            </button>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
