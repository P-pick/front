import { Suspense } from 'react';

import { TourCardImages } from '@/features/tourList';
import { SkeletonCard, StartTripButton } from '@/features/tour';
import { BookmarkButtonContainer } from '@/features/bookmark';
import { TOUR_TYPE } from '@/entities/tour';
import {
  DistanceTimeInfo,
  LoadingSpinner,
  QueryErrorBoundary,
  truncate,
} from '@/shared';

import type { TourItem } from '@/entities/tour';
import SharedButtonContainer from '@/features/shared/ui/SharedButtonContainer';
interface TourInfoCardProps {
  tourInfo: TourItem;
}

export default function TourInfoCard({ tourInfo }: TourInfoCardProps) {
  return (
    <article className="w-full flex flex-col my-8">
      <QueryErrorBoundary>
        <Suspense fallback={<SkeletonCard />}>
          <TourCardImages
            contentId={tourInfo.contentid}
            title={tourInfo.title}
          />
        </Suspense>
      </QueryErrorBoundary>

      {/* 타이틀 및 옵션 */}
      <header className="flex mt-4 items-center justify-between px-5">
        <div className="flex gap-1 items-center">
          <h2 className="font-bold text-[16px]">
            {truncate(tourInfo.title, { length: 15 })}
          </h2>
          <span className="rounded-2xl bg-[#EDEDED] py-1 px-2 text-[#595959] text-[8px]">
            {TOUR_TYPE[tourInfo.contenttypeid]}
          </span>
        </div>
        <nav className="flex gap-2.5" aria-label="카드 옵션">
          <SharedButtonContainer contentId={tourInfo.contentid} />
          <Suspense fallback={<LoadingSpinner />}>
            <BookmarkButtonContainer contentId={tourInfo.contentid} />
          </Suspense>
        </nav>
      </header>

      {/* 상세 정보 */}
      <section className="flex flex-col px-5 mt-2 text-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <DistanceTimeInfo
              dist={tourInfo.dist}
              iconFill="#FA4032"
              className="text-primary-red font-bold"
            />
            <address className="not-italic">
              {truncate(tourInfo.addr1 ?? '', { omission: '...', length: 15 })}
            </address>
          </div>
          <StartTripButton
            lng={tourInfo.mapx}
            lat={tourInfo.mapy}
            contentId={tourInfo.contentid}
            className="bg-primary-orange px-3 py-1 rounded-2xl text-white cursor-pointer"
          />
        </div>
        <p className="text-gray-700 mt-1"></p>
      </section>
    </article>
  );
}
