import { Map } from 'react-kakao-maps-sdk';
import NearbyTouristAttractionPinPoint from './NearbyTouristAttractionPinpoint';
import CurrentDeviceLocation from '../../components/CurrentDeviceLocation';
import { TouristContentsTypeFilter } from '@/components';
import { useMemo, useRef, useState } from 'react';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import useAroundTouristQuery from '../service/getAroundTouristMapData';
import { withAroundMapParams } from '../../components';
import { ResizingMap } from '../../destination/components';

interface GeoAroundTouristMapProps {
  location: GeoTripLocation;
  contentId: string;
  tourContentTypeId: AroundContentTypeId;
}

function GeoAroundTouristMap({
  location,
  contentId,
  tourContentTypeId,
}: GeoAroundTouristMapProps) {
  const [selectedContentTypeId, setSelectedContentTypeId] =
    useState<AroundContentTypeId>(tourContentTypeId);
  const aroundTouristObjects = useAroundTouristQuery(
    location,
    selectedContentTypeId
  );

  const middleTouristObject = useRef(aroundTouristObjects[0]);

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
      {aroundTouristObjects.length > 0 && (
        <NearbyTouristAttractionPinPoint
          tourist={middleTouristObject.current}
          location={location}
        />
      )}
    </Map>
  );
}

export default withAroundMapParams(GeoAroundTouristMap);
