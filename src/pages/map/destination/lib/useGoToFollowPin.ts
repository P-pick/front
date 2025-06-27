import { useStore } from 'zustand';
import useFollowAlong from '../store/useFollowAlong';
import { useMap } from 'react-kakao-maps-sdk';
import type { GeoTripLocation } from '@/pages/types';

const useGoToFollowPin = () => {
  const { setIsFollowAlong } = useStore(useFollowAlong);
  const map = useMap();

  const handleGoToFollowPin = (position: GeoTripLocation, index: number) => {
    const switchLocation = new kakao.maps.LatLng(position.lat, position.lng);
    setIsFollowAlong(true);
    map.panTo(switchLocation);
  };

  return { handleGoToFollowPin };
};

export default useGoToFollowPin;
