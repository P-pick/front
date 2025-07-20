import { Map } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { useMemo } from 'react';
import useFollowAlong from '../store/useFollowAlong';
import type { CarFollowFeature, PedestrianFollowFeature } from '../types';

interface PrefetchMapProps {
  followList: PedestrianFollowFeature[] | CarFollowFeature[];
}

const PrefetchMap = ({ followList }: PrefetchMapProps) => {
  const { currentFollowIndex } = useStore(useFollowAlong);

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
