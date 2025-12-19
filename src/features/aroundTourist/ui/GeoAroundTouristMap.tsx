import { useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Map } from 'react-kakao-maps-sdk';

import { aroundTouristQueries } from '@/entities/aroundTourist';

import { CurrentDeviceLocation, widthAroundMapParams } from '@/features/map';
import { ResizingMap } from '@/features/navigate';
import {
  NearbyTouristAttractionPinPoint,
  MiddleContent,
} from '@/features/aroundTourist';
import { TouristContentsTypeFilter, useLocalStorage } from '@/shared';

import type { TourItem } from '@/entities/tour';
import type { GeoTripLocation } from '@/shared';
import type { TourInjected } from '@/features/tour';

interface GeoAroundTouristMapProps {
  location: GeoTripLocation;
  contentId: string;
}

function GeoAroundTouristMap({ location }: GeoAroundTouristMapProps) {
  const [tourFilter, setTourFilter] = useLocalStorage('tourInfo', {
    distance: '20000',
    contentTypeId: '12',
  } as TourInjected);

  const { data: aroundTouristObjects = [] } = useQuery(
    aroundTouristQueries.list(location, tourFilter.contentTypeId),
  );

  const middleTouristRef = useRef<TourItem | null>(null);

  const middleTouristObject = useMemo(() => {
    if (aroundTouristObjects.length > 0 && middleTouristRef.current === null) {
      middleTouristRef.current = aroundTouristObjects[0];
      return aroundTouristObjects[0];
    }
    return middleTouristRef.current;
  }, [aroundTouristObjects]);

  const allLocation = useMemo(() => {
    return aroundTouristObjects.map(tourist => ({
      lat: tourist.mapy,
      lng: tourist.mapx,
    })) as GeoTripLocation[];
  }, [aroundTouristObjects]);

  return (
    <Map center={location} className="w-full h-full relative" level={7}>
      <div className="absolute top-0 left-0 z-10 w-full">
        <TouristContentsTypeFilter
          contentTypeId={tourFilter.contentTypeId}
          setContentTypeId={setTourFilter}
        />
      </div>
      <ResizingMap points={allLocation} />
      <CurrentDeviceLocation />
      {aroundTouristObjects.map(tourist => {
        return (
          <NearbyTouristAttractionPinPoint
            key={tourist.contentid}
            tourist={tourist}
          />
        );
      })}
      {aroundTouristObjects.length > 0 && middleTouristObject && (
        <MiddleContent location={location} tourist={middleTouristObject} />
      )}
    </Map>
  );
}

export default widthAroundMapParams(GeoAroundTouristMap);
