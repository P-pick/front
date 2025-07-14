import { commonSVG } from '@/assets';
import { DistanceTimeInfo, LoadingSpinner } from '@/components';

import type { TourItem } from '@/pages/types';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TourSlideImages } from '.';
import { useStartTrip } from '../lib';

interface TourSlideProps {
  tourInfo: TourItem;
  handleDetailOpen: () => void;
}

export default function TourSlide({
  tourInfo,
  handleDetailOpen,
}: TourSlideProps) {
  const { handleStartTrip } = useStartTrip();

  return (
    <article className="relative text-white w-full h-full flex flex-col items-center">
      <ErrorBoundary
        fallback={
          <img
            src={tourInfo.firstimage}
            alt={tourInfo.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        }
      >
        <Suspense
          fallback={
            <div className="absolute w-full h-full flex ">
              <LoadingSpinner />
            </div>
          }
        >
          <TourSlideImages contentId={tourInfo.contentid} />
        </Suspense>
      </ErrorBoundary>
      <footer className="w-full absolute z-[var(--z-layer2)] bottom-0 left-0 px-4 bg-gradient-to-t from-black/70 to-transparent max-h-60">
        <div className="flex flex-col gap-2 py-4">
          <div className="flex gap-1 items-center">
            <h1 className="text-2xl font-bold max-w-60">{tourInfo.title}</h1>
            <commonSVG.InfoIcon
              className="text-white cursor-pointer"
              onClick={handleDetailOpen}
            />
          </div>
          <div className="flex justify-between">
            <DistanceTimeInfo dist={tourInfo.dist} iconFill="white" />
          </div>
        </div>
        <nav className="w-full flex justify-center mt-4">
          <button
            type="button"
            className="mb-[24px] bg-white rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] cursor-pointer"
            onClick={() =>
              handleStartTrip({
                lat: tourInfo.mapy,
                lng: tourInfo.mapx,
              })
            }
          >
            여행 시작하기
          </button>
        </nav>
      </footer>

      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-(--z-layer1)" />
    </article>
  );
}
