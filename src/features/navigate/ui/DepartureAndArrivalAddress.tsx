import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { commonSVG, destinationSVG } from '@/assets';

import { useAddressFromCoords } from '@/features/map';
import { tourQueries } from '@/entities/tour';

import type { GeoTripLocation } from '@/shared';

interface DepartureAndArrivalAddressProps {
  start: GeoTripLocation;
  id: string;
}

export default function DepartureAndArrivalAddress({
  start,
  id,
}: DepartureAndArrivalAddressProps) {
  const navigate = useNavigate();
  const tourDetail = useSuspenseQuery(tourQueries.detailCommon(id)).data;

  const startName = useAddressFromCoords(start) || '출발지';
  const endName = tourDetail.title || '도착지';

  return (
    <div className="border-1 rounded-2xl w-full border-gray-300 flex justify-between items-center py-3 px-6">
      <div className="flex justify-center items-center gap-2 text-xs font-bold max-w-32">
        <destinationSVG.StartPoint width={10} height={10} />
        <span>{startName}</span>
      </div>
      <commonSVG.RightArrowIcon />
      <div className="flex justify-center items-center gap-2 text-xs font-bold max-w-32">
        <destinationSVG.EndPoint width={10} height={10} />
        <span>{endName}</span>
      </div>
      <commonSVG.DeleteIcon
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}
