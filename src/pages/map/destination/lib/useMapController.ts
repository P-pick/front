import { useMap } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import useFollowAlong from '../store/useFollowAlong';
import type { GeoTripLocation } from '@/pages/types';

interface UseResizingMapLevel {
  points: GeoTripLocation[];
}

/**
 * 해당 훅은 Map컴포넌트 하위헤서 사용할 수 있습니다.
 */
const useMapController = () => {
  const map = useMap();
  const { setIsFollowAlong, setCurrentFollowIndex } = useStore(useFollowAlong);

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

    setIsFollowAlong(true);
    map.panTo(switchLocation);
    setCurrentFollowIndex(index);
  };

  /**
   * @description 지도 리사이징 핸들러
   * @param points - 리사이징할 포인트 배열
   */
  const handleMapResizing = ({ points }: UseResizingMapLevel) => {
    const bounds = new kakao.maps.LatLngBounds();
    points.forEach(point => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    if (map && points.length > 0) {
      map.setBounds(bounds, 100, 0, 150, 0);
    }
  };

  return {
    map,
    handleSwitchLocationToPosition,
    handleGoToFollowPin,
    handleMapResizing,
  };
};

export default useMapController;
