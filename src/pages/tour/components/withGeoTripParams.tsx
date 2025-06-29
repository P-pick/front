import { useSearchParams } from 'react-router-dom';
import type { GeoTripLocation } from '@/pages/types';
import getSuspenseLocation from '@/lib/getSuspenseLocation';
import type { AroundContentTypeId } from '@/pages/map/aroundSearch/types';
import { isValidTourType } from '@/lib';

interface InjectedProps {
  location: GeoTripLocation;
  distance: string;
  tourType: AroundContentTypeId;
}

export default function withGeoTripParams<P extends InjectedProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function GeoTripWrapper(props: Omit<P, keyof InjectedProps>) {
    const [searchParams] = useSearchParams();
    const distance = searchParams.get('distance');
    const tourType = searchParams.get('tour-type');
    const geoLocation = getSuspenseLocation();

    if (!distance || !tourType) {
      return (
        <div>필요한 정보가 부족합니다. 거리와 관광지 타입을 확인해주세요.</div>
      );
    }
    if (!isValidTourType(tourType)) {
      return <div>잘못된 관광 타입입니다.</div>;
    }

    return (
      <WrappedComponent
        {...(props as P)}
        location={geoLocation}
        distance={distance}
        tourType={tourType}
      />
    );
  };
}
