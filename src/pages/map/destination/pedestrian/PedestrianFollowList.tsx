import React from 'react';
import type { GeoTripLocation } from '@/pages/types';
import getPedestrianFollowList from './getPedestrianFollowList';
import type { PedestrianFeatures } from '../types';
import { SelectedFollow } from '../components';

const PedestrianFollowList = ({
  start,
  destination,
}: {
  start: GeoTripLocation;
  destination: PedestrianFeatures[];
}) => {
  const followList = getPedestrianFollowList(destination);

  return <SelectedFollow firstIndexPosition={start} followList={followList} />;
};

export default React.memo(PedestrianFollowList);
