import React from 'react';
import type { CarFeatures } from '../../types';
import type { GeoTripLocation } from '@/pages/types';
import { SelectedFollow } from '../follow';
import getCarFollowList from './getCarFollowList';

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
