import { useSearchParams } from 'react-router-dom';

import { isValidTourType } from '@/features/map';

import type { AroundContentTypeId } from '@/entities/tour';
interface InjectedProps {
  distance: string;
  tourContentTypeId: AroundContentTypeId;
}

export function withGeoTripParams<P extends InjectedProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function GeoTripWrapper(props: Omit<P, keyof InjectedProps>) {
    const [searchParams] = useSearchParams();
    const distance = searchParams.get('distance');
    const tourContentTypeId = searchParams.get('tour-type');

    if (!distance || !tourContentTypeId) {
      throw new Error(
        '필요한 정보가 부족합니다. 거리와 관광지 타입을 확인해주세요.',
      );
    }

    if (!isValidTourType(tourContentTypeId)) {
      throw new Error('잘못된 관광 타입입니다.');
    }

    return (
      <WrappedComponent
        {...(props as P)}
        distance={distance}
        tourContentTypeId={tourContentTypeId}
      />
    );
  };
}
