import { Map, MapMarker } from 'react-kakao-maps-sdk';
import NearbyTouristAttractionPinPoint from './NearbyTouristAttractionPinpoint';
import CurrentDeviceLocation from '../../components/CurrentDeviceLocation';
import {
  BottomSheet,
  LoadingSpinner,
  TourCard,
  TouristContentsTypeFilter,
} from '@/components';
import { Suspense, useState } from 'react';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import useAroundTouristQuery from '../service/getAroundTouristMapData';
import { TourOverView } from '@/pages/tour/geotrip/components';
import { withAroundMapParams } from '../../components';
import { LocationIcon } from '@/assets/common';

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

  return (
    <Map center={location} className="w-full h-full relative" level={7}>
      <div className="absolute top-0 left-0 z-10 w-full">
        <TouristContentsTypeFilter
          contentTypeId={selectedContentTypeId}
          setContentTypeId={setSelectedContentTypeId}
        />
      </div>

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
          tourist={aroundTouristObjects[0]}
          location={location}
        />
      )}
    </Map>
  );
}

export default withAroundMapParams(GeoAroundTouristMap);
