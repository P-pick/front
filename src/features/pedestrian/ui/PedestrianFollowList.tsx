import React from 'react';

import { SelectedFollow } from '@/features/navigate';
import { getPedestrianFollowList } from '@/features/pedestrian';

import type { PEDESTRIAN } from '@/entities/navigate';
import type { GeoTripLocation } from '@/shared';

const PedestrianFollowList = ({
  start,
  destination,
}: {
  start: GeoTripLocation;
  destination: PEDESTRIAN.PedestrianFeatures[];
}) => {
  const followList = getPedestrianFollowList(destination);

  return <SelectedFollow firstIndexPosition={start} followList={followList} />;
};

export default React.memo(PedestrianFollowList);
