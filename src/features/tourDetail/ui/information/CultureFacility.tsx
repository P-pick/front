import { tourDetailSVG, commonSVG } from '@/assets';

import type { CultureFacility, TourDetailCommon } from '@/entities/tour';
import { SafeHtmlRenderer } from '@/shared';

interface CultureFacilityProps {
  common: TourDetailCommon;
  intro: CultureFacility;
}

export default function CultureFacility({
  common,
  intro,
}: CultureFacilityProps) {
  return (
    <div className="p-3 w-full">
      <ul className="flex flex-col gap-2 text-sm">
        {intro.usetimeculture && intro.restdateculture && (
          <li className="flex gap-3 justify-start items-center">
            <tourDetailSVG.TimeIcon className="w-3 h-3" />
            <div className="flex flex-col gap-1">
              {intro.usetimeculture && (
                <SafeHtmlRenderer html={intro.usetimeculture} />
              )}
              {intro.restdateculture && (
                <p>
                  <span className="text-red-600">휴무일</span>&nbsp;
                  {intro.restdateculture}
                </p>
              )}
            </div>
          </li>
        )}
        {common.homepage && (
          <li className="flex gap-3 justify-start items-center">
            <tourDetailSVG.WWWIcon className="w-3 h-3" />
            <SafeHtmlRenderer html={common.homepage} />
          </li>
        )}
        <li className="flex gap-3 justify-start items-center">
          <commonSVG.LocationIcon className="w-3 h-3" />
          <div className="flex gap-1">
            <p>
              {common.addr1 ?? ''} {common.addr2 ?? ''} (우)
              {common.zipcode ?? ''}
            </p>
          </div>
        </li>

        <li className="flex gap-3 justify-start items-center">
          <tourDetailSVG.CallIcon className="w-3 h-3" />{' '}
          {intro.infocenterculture}
        </li>
        {intro.parkingculture && (
          <li className="flex gap-3 justify-start items-center">
            <tourDetailSVG.ParkingIcon className="w-3 h-3" />
            <span>
              주차 {intro.parkingculture}&nbsp;
              {intro.parkingfee && `(${intro.parkingfee})`}
            </span>
          </li>
        )}
      </ul>
      {/**구분선 */}
      <hr className="my-3" />
      <h2>상품</h2>
      {intro.usefee && (
        <section className="mt-3 text-sm">
          <SafeHtmlRenderer html={intro.usefee} />
        </section>
      )}
    </div>
  );
}
