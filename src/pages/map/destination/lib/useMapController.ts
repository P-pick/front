import { useMap } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import useFollowAlong from '../store/useFollowAlong';

/**
 * 해당 훅은 Map컴포넌트 하위헤서 사용할 수 있습니다.
 */
const useMapController = () => {
  const map = useMap();
  const { setIsFollowAlong, setCurrentFollowIndex } = useStore(useFollowAlong);

  const handleSwitchLocationToPosition = (
    position: { lat: number; lng: number },
    isPanTo: boolean = false,
    level: number = 3
  ) => {
    const switchLocation = new kakao.maps.LatLng(position.lat, position.lng);

    map.setLevel(level);
    if (isPanTo) {
      map.panTo(switchLocation);
    } else {
      map.setCenter(switchLocation);
    }
  };

  const handleGoToFollowPin = (
    position: { lat: number; lng: number },
    index: number
  ) => {
    const switchLocation = new kakao.maps.LatLng(position.lat, position.lng);

    setIsFollowAlong(true);
    map.panTo(switchLocation);
    setCurrentFollowIndex(index);
  };

  return { handleSwitchLocationToPosition, handleGoToFollowPin };
};

export default useMapController;
