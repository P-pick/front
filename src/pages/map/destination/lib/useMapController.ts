import { useMap } from 'react-kakao-maps-sdk';

/**
 * 해당 훅은 Map컴포넌트 하위헤서 사용할 수 있습니다.
 */
const useMapController = () => {
  const map = useMap();

  const handleSwitchLocationToPosition = <T extends void>(
    position: { lat: number; lng: number },
    isPanTo: boolean = false,
    level: number = 3,
    callback?: (...args: any[]) => T
  ) => {
    const switchLocation = new kakao.maps.LatLng(position.lat, position.lng);

    map.setLevel(level);
    if (isPanTo) {
      map.panTo(switchLocation);
    } else {
      map.setCenter(switchLocation);
    }
    if (callback) {
      callback();
    }
  };

  return { handleSwitchLocationToPosition };
};

export default useMapController;
