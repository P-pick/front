import { tourDetailSVG, commonSVG } from '@/assets';

import type { TourDetailCommon, TouristAttraction } from '@/entities/tour';
import { SafeHtmlRenderer } from '@/shared';

interface TouristAttractionInfoProps {
  common: TourDetailCommon;
  intro: TouristAttraction;
}

export default function TouristAttractionInfo({
  common,
  intro,
}: TouristAttractionInfoProps) {
  return (
    <div className="p-3">
      <ul className="flex flex-col gap-2 text-sm">
        <li className="flex gap-3 justify-start items-center">
          <tourDetailSVG.TimeIcon className="w-3 h-3" />
          <div className="flex flex-col gap-1">
            <span>{intro.usetime}</span>
            <p>
              <span className="text-red-600">휴무일</span> {intro.restdate}
            </p>
          </div>
        </li>
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
          <tourDetailSVG.CallIcon className="w-3 h-3" /> {intro.infocenter}
        </li>
        {intro.parking && (
          <li className="flex gap-3 justify-start items-center">
            <tourDetailSVG.ParkingIcon className="w-3 h-3" />
            <span>주차 {intro.parking}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
