import { HeartIcon, OptionIcon } from '@/assets';
import { DistanceTimeInfo } from '@/components';
import { truncate } from '@/lib';
import { TOUR_TYPE } from '@/pages/const/MARKER';

import type { TourItemWithDetail } from '@/pages/types';

interface TourInfoCardProps {
  tourInfo: TourItemWithDetail;
}

export default function TourInfoCard({ tourInfo }: TourInfoCardProps) {
  return (
    <article className="flex flex-col my-8">
      {/* 이미지 섹션 */}
      <figure className="w-full h-[150px]">
        <div className="flex gap-0.5 h-full flex-6/10">
          <div className="relative">
            <img
              src={tourInfo.images[0].originimgurl}
              className="h-full object-cover aspect-square rounded"
              alt={tourInfo.title}
            />
          </div>
          <div className="flex flex-col gap-0.5 h-full flex-4/10">
            <div className="relative h-1/2">
              <img
                src={tourInfo.images[0].originimgurl}
                className="object-cover h-full w-full"
                alt={`${tourInfo.title} 썸네일 1`}
              />
            </div>
            <div className="relative h-1/2">
              <img
                src={tourInfo.images[0].originimgurl}
                className="object-cover h-full w-full"
                alt={`${tourInfo.title} 썸네일 2`}
              />
            </div>
          </div>
        </div>
      </figure>

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
            <OptionIcon />
          </button>
          <button aria-label="찜하기">
            <HeartIcon />
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
