import React from 'react';
import type { GeoTripLocation } from '@/pages/types';
import getCarFollowList from './getCarFollowList';
import type { CarFeatures } from '../types';
import { SelectedFollow } from '../components';

const CarFollowList = ({
  start,
  destination,
}: {
  start: GeoTripLocation;
  destination: CarFeatures[];
}) => {
  const followList = getCarFollowList(destination);

  return <SelectedFollow firstIndexPosition={start} followList={followList} />;
};

export default React.memo(CarFollowList);
