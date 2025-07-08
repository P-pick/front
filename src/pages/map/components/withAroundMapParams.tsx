import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import type React from 'react';
import { useSearchParams } from 'react-router-dom';

interface InjectedProps {
  location: GeoTripLocation;
  contentId: string;
  tourContentTypeId: AroundContentTypeId;
}

export default function withAroundMapParams<P extends InjectedProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function AroundMapWrapper(props: Omit<P, keyof InjectedProps>) {
    const [searchParams] = useSearchParams();

    const mapx = searchParams.get('lng');
    const mapy = searchParams.get('lat');
    const contentId = searchParams.get('contentId');
    const tourContentTypeId = searchParams.get(
      'contentTypeId',
    ) as AroundContentTypeId;

    const location: GeoTripLocation = {
      lat: mapy ? Number(mapy) : 0,
      lng: mapx ? Number(mapx) : 0,
    };

    if (!location || !contentId || !tourContentTypeId) {
      return (
        <div>
          필요한 정보가 부족합니다. 위치, 콘텐츠 ID, 관광지 타입을 확인해주세요.
        </div>
      );
    }

    return (
      <WrappedComponent
        {...(props as P)}
        location={location}
        contentId={contentId}
        tourContentTypeId={tourContentTypeId}
      />
    );
  };
}
