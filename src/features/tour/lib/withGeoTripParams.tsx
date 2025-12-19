import { isValidTourType } from '@/features/map';

import { useLocalStorage } from '@/shared';
import type { TourInjected } from '../types';

export function withGeoTripParams<P extends TourInjected>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function GeoTripWrapper(props: Omit<P, keyof TourInjected>) {
    const [tourInfo] = useLocalStorage('tourInfo', {
      distance: '20000',
      contentTypeId: '12',
    });

    if (!tourInfo.distance || !tourInfo.contentTypeId) {
      throw new Error(
        '필요한 정보가 부족합니다. 거리와 관광지 타입을 확인해주세요.',
      );
    }

    if (!isValidTourType(tourInfo.contentTypeId)) {
      throw new Error('잘못된 관광 타입입니다.');
    }

    return (
      <WrappedComponent
        {...(props as P)}
        distance={tourInfo.distance}
        contentTypeId={tourInfo.contentTypeId}
      />
    );
  };
}
