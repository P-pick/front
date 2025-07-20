import { useMemo } from 'react';
import getPedestrianFollowList from './getPedestrianFollowList';
import { useStore } from 'zustand';
import { gettingConversion } from '@/pages/map/lib';
import clsx from 'clsx';
import type { PedestrianMultiplePathResponse } from '../types';
import { useTransportation } from '../store';

export default function PedestrianOptionDetail({
  optionId,
  name,
  features,
}: PedestrianMultiplePathResponse) {
  const { searchOptions } = useStore(useTransportation);

  const followList = getPedestrianFollowList(features);

  const takeTimeToGo = useMemo(() => {
    if (followList.length === 0 || !followList[0]?.totalTime) {
      return null;
    }
    return gettingConversion.conversionSecToHour(followList[0].totalTime);
  }, [followList]);

  const takeDistanceToGo = useMemo(() => {
    if (followList.length === 0 || !followList[0]?.totalDistance) {
      return null;
    }
    return gettingConversion.conversionPathDistance(
      followList[0].totalDistance,
    );
  }, [followList]);

  const isSelectedBorder = clsx('border-[#4D5A6A] border-1', {
    'border-primary-red': searchOptions === optionId,
  });

  const isSelectedH2 = clsx('text-[#4D5A6A]', {
    'text-primary-red': searchOptions === optionId,
  });

  return (
    <div
      className={`w-full h-full bg-white flex-col p-3  rounded-2xl ${isSelectedBorder}`}
    >
      <h2 className={`text-xs font-bold ${isSelectedH2}`}>{name}</h2>
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
