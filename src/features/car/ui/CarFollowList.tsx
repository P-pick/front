import React from 'react';

import { SelectedFollow } from '@/features/navigate';
import { getCarFollowList } from '@/features/car';

import type { CAR } from '@/entities/navigate';
import type { GeoTripLocation } from '@/shared';

const CarFollowList = ({
  start,
  destination,
}: {
  start: GeoTripLocation;
  destination: CAR.CarFeatures[];
}) => {
  const followList = getCarFollowList(destination);

  return <SelectedFollow firstIndexPosition={start} followList={followList} />;
};

export default React.memo(CarFollowList);
