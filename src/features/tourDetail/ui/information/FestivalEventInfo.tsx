import { tourDetailSVG, commonSVG } from '@/assets';

import { ExtraInfo } from '@/features/tourDetail';
import { SafeHtmlRenderer } from '@/shared';

import type { FestivalEvent, TourDetailCommon } from '@/entities/tour';

interface FestivalEventProps {
  common: TourDetailCommon;
  intro: FestivalEvent;
}

export default function FestivalEvent({ common, intro }: FestivalEventProps) {
  return (
    <>
      <section className="p-3 w-full flex flex-col gap-2 text-sm">
        {intro.playtime && (
          <div className="flex gap-3 justify-start items-center">
            <div>
              <tourDetailSVG.TimeIcon className="w-3 h-3" />
            </div>
            <SafeHtmlRenderer html={intro.playtime} />
          </div>
        )}
        {common.homepage && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.WWWIcon className="w-3 h-3" />
            <SafeHtmlRenderer html={common.homepage} />
          </div>
        )}
        <div className="flex gap-3 justify-start items-center">
          <commonSVG.LocationIcon className="w-3 h-3" />
          <div className="flex gap-1">
            <p>
              {common.addr1 ?? ''} {common.addr2 ?? ''} (우)
              {common.zipcode ?? ''}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-start items-center">
          <tourDetailSVG.CallIcon className="w-3 h-3" /> {common.tel}
        </div>
      </section>
      {/**구분선 */}
      <hr className="my-3" />
      <section className="p-3 w-full flex flex-col gap-3">
        <ExtraInfo title="행사 장소" content={intro.eventplace} />
        <ExtraInfo
          title="행사 기간"
          content={`${intro.eventstartdate} ~ ${intro.eventenddate}`}
        />
        <ExtraInfo title="상품" content={intro.usetimefestival} />
        <ExtraInfo
          title="주최"
          content={`${intro.sponsor1} ${intro.sponsor1tel && `(${intro.sponsor1tel})`}`}
        />
        <ExtraInfo
          title="주관"
          content={`${intro.sponsor2} ${intro.sponsor2tel && `(${intro.sponsor2tel})`}`}
        />
      </section>
    </>
  );
}
