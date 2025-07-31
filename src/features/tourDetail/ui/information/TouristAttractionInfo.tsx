import { tourDetailSVG, commonSVG } from '@/assets';

import type { TourDetailCommon, TouristAttraction } from '@/entities/tour';
import { SafeHtmlRenderer } from '@/shared';
import ExtraInfo from './ExtraInfo';

interface TouristAttractionInfoProps {
  common: TourDetailCommon;
  intro: TouristAttraction;
}

export default function TouristAttractionInfo({
  common,
  intro,
}: TouristAttractionInfoProps) {
  return (
    <>
      <section className="p-3 flex flex-col gap-2 text-sm">
        <div className="flex gap-3 justify-start items-center">
          <div>
            <tourDetailSVG.TimeIcon className="w-3 h-3" />
          </div>
          <div className="flex flex-col gap-1">
            <span>{intro.usetime}</span>
            <p>
              <span className="text-red-600">휴무일</span> {intro.restdate}
            </p>
          </div>
        </div>
        {common.homepage && (
          <li className="flex gap-3 justify-start items-center">
            <tourDetailSVG.WWWIcon className="w-3 h-3" />
            <SafeHtmlRenderer html={common.homepage} />
          </li>
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
          <tourDetailSVG.CallIcon className="w-3 h-3" /> {intro.infocenter}
        </div>
        {intro.parking && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.ParkingIcon className="w-3 h-3" />
            <span>주차 {intro.parking}</span>
          </div>
        )}
      </section>
      {intro.expagerange && intro.expguide && (
        <>
          <hr className="my-3" />
          <section className="p-3 w-full flex flex-col gap-3">
            <ExtraInfo title="체험 안내" content={intro.expguide} />
            <ExtraInfo title="체험 가능 연령" content={intro.expagerange} />
          </section>
        </>
      )}
    </>
  );
}
