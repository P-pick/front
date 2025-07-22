import type {
  AroundContentTypeId,
  GeoTripLocation,
  TourItem,
} from '@/pages/types';
import { TouristContentsTypeFilter } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { withAroundMapParams } from '../../components';
import CurrentDeviceLocation from '../../components/CurrentDeviceLocation';
import { ResizingMap } from '../../destination/components';
import getAroundTouristQueryOptions from '../service/getAroundTouristMapData';
import MiddleContent from './MiddleContent';
import NearbyTouristAttractionPinPoint from './NearbyTouristAttractionPinpoint';

interface GeoAroundTouristMapProps {
  location: GeoTripLocation;
  contentId: string;
  tourContentTypeId: AroundContentTypeId;
}

function GeoAroundTouristMap({
  location,
  tourContentTypeId,
}: GeoAroundTouristMapProps) {
  const [selectedContentTypeId, setSelectedContentTypeId] =
    useState<AroundContentTypeId>(tourContentTypeId);

  const { data: aroundTouristObjects = [] } = useQuery(
    getAroundTouristQueryOptions(location, selectedContentTypeId),
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
          contentTypeId={selectedContentTypeId}
          setContentTypeId={setSelectedContentTypeId}
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

export default withAroundMapParams(GeoAroundTouristMap);
