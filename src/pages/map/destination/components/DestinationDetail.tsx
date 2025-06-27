import { useMemo } from 'react';
import clsx from 'clsx';
import { useStore } from 'zustand';
import type { PolyFeatures } from '../types';
import { useTransportation } from '../store';
import { getSelectedTransportationFollow } from '../lib';
import { gettingConversion } from '../../lib';

interface DestinationDetailProps {
  searchId: number;
  searchName: string;
  features: PolyFeatures;
}

export default function DestinationDetail({
  searchId,
  searchName,
  features,
}: DestinationDetailProps) {
  const { vehicle, searchOptions } = useStore(useTransportation);

  const polylines = useMemo(() => {
    if (features) {
      return getSelectedTransportationFollow(vehicle, features);
    }
    return [];
  }, [vehicle, features]);
  const takeTimeToGo = useMemo(() => {
    if (polylines.length === 0 || !polylines[0]?.totalTime) {
      return null;
    }
    return gettingConversion.conversionSecToHour(polylines[0].totalTime);
  }, [polylines]);

  const takeDistanceToGo = useMemo(() => {
    if (polylines.length === 0 || !polylines[0]?.totalDistance) {
      return null;
    }
    return gettingConversion.conversionPathDistance(polylines[0].totalDistance);
  }, [polylines]);

  const isSelectedBorder = clsx('border-[#4D5A6A] border-1', {
    'border-primary-red': searchOptions === searchId,
  });

  const isSelectedH2 = clsx('text-[#4D5A6A]', {
    'text-primary-red': searchOptions === searchId,
  });

  return (
    <div
      className={`w-full h-full bg-white flex-col p-3  rounded-2xl ${isSelectedBorder}`}
    >
      <h2 className={`text-xs font-bold ${isSelectedH2}`}>{searchName}</h2>
      <p className="text-xs">
        {takeTimeToGo && takeTimeToGo.hours > 0 ? (
          <>
            <span className="text-xl font-bold">{takeTimeToGo.hours}</span>
            시간&nbsp;
          </>
        ) : (
          ''
        )}
        {takeTimeToGo && (
          <span className="text-xl font-bold">{takeTimeToGo.minutes}</span>
        )}
        분
      </p>
      <div>
        <span className="text-xs">{takeDistanceToGo}</span>
      </div>
    </div>
  );
}
