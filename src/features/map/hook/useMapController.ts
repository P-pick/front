import { useMap } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { useFollowAlongStore } from '@/features/navigate';

/**
 * 해당 훅은 Map컴포넌트 하위헤서 사용할 수 있습니다.
 */
const useMapController = () => {
  const map = useMap();
  const { setCurrentFollowIndex } = useStore(useFollowAlongStore);

  /**
   * @description 따라가기시 위치 변경 핸들러
   * @param position - point 위치 정보
   * @param isPanTo - 부드러운 이동 여부
   * @param level - 지도 레벨 default 3
   */
  const handleSwitchLocationToPosition = (
    position: { lat: number; lng: number },
    isPanTo: boolean = false,
    level: number = 3,
  ) => {
    const switchLocation = new kakao.maps.LatLng(position.lat, position.lng);

    map.setLevel(level);
    if (isPanTo) {
      map.panTo(switchLocation);
    } else {
      map.setCenter(switchLocation);
    }
  };

  /**
   * @description index에 따라 핀 위치 이동 핸들러
   * @param position - 핀 위치 정보
   * @param index - 핀 인덱스
   */
  const handleGoToFollowPin = (
    position: { lat: number; lng: number },
    index: number,
  ) => {
    const switchLocation = new kakao.maps.LatLng(position.lat, position.lng);

    setCurrentFollowIndex(index);
    requestAnimationFrame(() => {
      map.panTo(switchLocation);
    });
  };

  return {
    map,
    handleSwitchLocationToPosition,
    handleGoToFollowPin,
  };
};

export default useMapController;
