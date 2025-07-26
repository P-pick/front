import { useSearchParams } from 'react-router-dom';

import type { AroundContentTypeId } from '@/entities/tour';

import { isValidTourType } from '@/features/map';
import { TourShortFormTutor } from '@/features/tutorial';
import { getSuspenseLocation } from '@/shared';

import type { GeoTripLocation } from '@/shared';

interface InjectedProps {
  location: GeoTripLocation;
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
    const geoLocation = getSuspenseLocation();

    if (!distance || !tourContentTypeId) {
      return (
        <div>필요한 정보가 부족합니다. 거리와 관광지 타입을 확인해주세요.</div>
      );
    }
    if (!isValidTourType(tourContentTypeId)) {
      return <div>잘못된 관광 타입입니다.</div>;
    }

    return (
      <>
        <TourShortFormTutor />
        <WrappedComponent
          {...(props as P)}
          location={geoLocation}
          distance={distance}
          tourContentTypeId={tourContentTypeId}
        />
      </>
    );
  };
}
