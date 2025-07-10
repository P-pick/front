import { useMapController } from '../../lib';
import type { CarFollowFeature, PedestrianFollowFeature } from '../../types';
import { StaticMap } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import useFollowAlong from '../../store/useFollowAlong';

export default function PrefetchMap({
  followList,
}: {
  followList: PedestrianFollowFeature[] | CarFollowFeature[];
}) {
  const [nextPosition, setNextPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const { map } = useMapController();
  const { currentFollowIndex } = useStore(useFollowAlong);

  useEffect(() => {
    if (!followList || followList.length === 0) {
      return;
    }
    const nextIndex = currentFollowIndex + 1;
    const nextFollowItem =
      nextIndex < followList.length ? followList[nextIndex] : undefined;

    if (nextFollowItem) {
      const position = nextFollowItem.path[0];
      setNextPosition({
        lat: position.lat,
        lng: position.lng,
      });
    }
  }, [currentFollowIndex]);

  console.log(nextPosition);

  return (
    <>
      <StaticMap
        center={{
          lat: nextPosition.lat,
          lng: nextPosition.lng,
        }}
        style={{ width: '100%', height: '100%' }}
        level={map.getLevel()}
        marker={false}
      />
    </>
  );
}
