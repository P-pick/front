import { tourDetailSVG, commonSVG } from '@/assets';

import { SafeHtmlRenderer } from '@/shared';

import type { Leports, TourDetailCommon } from '@/entities/tour';

interface LeportsInfoProps {
  common: TourDetailCommon;
  intro: Leports;
}

export default function LeportsInfo({ common, intro }: LeportsInfoProps) {
  return (
    <>
      <section className="p-3 w-full flex flex-col gap-2 text-sm">
        {intro.usetimeleports && (
          <div className="flex gap-3 justify-start items-center">
            <div>
              <tourDetailSVG.TimeIcon className="w-3 h-3" />
            </div>
            <div>
              <SafeHtmlRenderer html={intro.usetimeleports} />
              {intro.restdateleports && (
                <div className="flex gap-1">
                  <span className="text-red-600">휴무일</span>
                  <SafeHtmlRenderer html={intro.restdateleports} />
                </div>
              )}
            </div>
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
        {intro.infocenterleports && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.CallIcon className="w-3 h-3" />{' '}
            {intro.infocenterleports}
          </div>
        )}
        {intro.parkingleports && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.ParkingIcon className="w-3 h-3" /> 주차{' '}
            {intro.parkingleports}
            {intro.parkingfeeleports && `(${intro.parkingfeeleports})`}
          </div>
        )}
      </section>
    </>
  );
}
