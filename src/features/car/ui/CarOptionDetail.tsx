import { useMemo } from 'react';
import { useStore } from 'zustand';
import clsx from 'clsx';
import {
  conversionPathDistance,
  TakeTimeToGo,
  useTransportationStore,
} from '@/features/navigate';
import { getCarFollowList } from '../model';

import type { CAR } from '@/entities/navigate';

export default function CarOptionDetail({
  optionId,
  name,
  features,
}: CAR.CarMultiplePathResponse) {
  const { searchOptions } = useStore(useTransportationStore);

  const followList = getCarFollowList(features);

  const takeDistanceToGo = useMemo(() => {
    if (followList.length === 0 || !followList[0]?.totalDistance) {
      return null;
    }
    return conversionPathDistance(followList[0].totalDistance);
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
      <TakeTimeToGo time={followList[0].totalTime} />
      <div>
        <span className="text-xs">{takeDistanceToGo}</span>
      </div>
    </div>
  );
}
