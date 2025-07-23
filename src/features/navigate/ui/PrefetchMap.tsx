import { useMemo } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';

import { useFollowAlongStore } from '@/features/navigate';

import type { CAR, PEDESTRIAN } from '@/entities/navigate';

interface PrefetchMapProps {
  followList: PEDESTRIAN.PedestrianFollowFeature[] | CAR.CarFollowFeature[];
}

const PrefetchMap = ({ followList }: PrefetchMapProps) => {
  const { currentFollowIndex } = useStore(useFollowAlongStore);

  const position = useMemo(() => {
    const nextIndex = currentFollowIndex + 1;
    if (nextIndex > followList.length - 1) {
      return followList[currentFollowIndex].path[0];
    }
    return followList[nextIndex].path[0];
  }, [followList, currentFollowIndex]);

  return (
    <Map
      id="prefetch-map"
      center={position}
      level={3}
      className="w-full h-full absolute -z-40 top-0 left-0"
    ></Map>
  );
};

export default PrefetchMap;
