import { tourDetailSVG } from '@/assets';

import { ExtraInfo, InfoLayout } from '@/features/tourDetail';
import { SafeHtmlRenderer, formattedDate } from '@/shared';

import type { FestivalEvent, TourDetailCommon } from '@/entities/tour';

interface FestivalEventProps {
  common: TourDetailCommon;
  intro: FestivalEvent;
}

export default function FestivalEvent({ common, intro }: FestivalEventProps) {
  return (
    <InfoLayout>
      <InfoLayout.Header common={common}>
        {intro.playtime && (
          <div className="flex gap-3 justify-start items-center">
            <div>
              <tourDetailSVG.TimeIcon className="w-3 h-3" />
            </div>
            <SafeHtmlRenderer html={intro.playtime} />
          </div>
        )}
      </InfoLayout.Header>
      <InfoLayout.Content>
        <ExtraInfo title="행사 장소" content={intro.eventplace} />
        <ExtraInfo
          title="행사 기간"
          content={`${formattedDate(intro.eventstartdate)} ~ ${formattedDate(intro.eventenddate)}`}
        />
        <ExtraInfo title="상품" content={intro.usetimefestival} />
      </InfoLayout.Content>
      <InfoLayout.Footer common={common}>
        <ExtraInfo
          title="주최"
          content={`${intro.sponsor1} ${intro.sponsor1tel && `(${intro.sponsor1tel})`}`}
        />
        <ExtraInfo
          title="주관"
          content={`${intro.sponsor2} ${intro.sponsor2tel && `(${intro.sponsor2tel})`}`}
        />
      </InfoLayout.Footer>
    </InfoLayout>
  );
}
