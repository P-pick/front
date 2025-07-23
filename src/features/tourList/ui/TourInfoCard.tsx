import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { TOUR_TYPE } from '@/pages/const/MARKER';
import type { TourItem } from '@/pages/types';
import { commonSVG } from '@/assets';

import { TourCardImages } from '@/features/tourList/ui';
import { truncate } from '@/lib';
import { DistanceTimeInfo } from '@/shared/ui';
import { SkeletonCard } from '@/features/tour/ui';

interface TourInfoCardProps {
  tourInfo: TourItem;
}

export default function TourInfoCard({ tourInfo }: TourInfoCardProps) {
  return (
    <article className="flex flex-col my-8">
      <ErrorBoundary FallbackComponent={() => <>임시 에러처리</>}>
        <Suspense fallback={<SkeletonCard />}>
          <TourCardImages
            contentId={tourInfo.contentid}
            title={tourInfo.title}
          />
        </Suspense>
      </ErrorBoundary>

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
          <button aria-label="옵션 보기">
            <commonSVG.ShareIcon />
          </button>
          <button aria-label="찜하기">
            <commonSVG.HeartIcon />
          </button>
        </nav>
      </header>

      {/* 상세 정보 */}
      <section className="flex flex-col px-5 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <DistanceTimeInfo
            dist={tourInfo.dist}
            iconFill="#FA4032"
            className="text-primary-red font-bold"
          />
          <address className="not-italic">
            {truncate(tourInfo.addr1 ?? '', { omission: '', length: 10 })}
          </address>
        </div>
        <p className="text-gray-700 mt-1"></p>
      </section>
    </article>
  );
}
