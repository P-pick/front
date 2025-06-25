import { Map, MapMarker } from 'react-kakao-maps-sdk';
import AroundTouristNavigate from './AroundTouristNavigate';
import NearbyTouristAttractionPinPoint from './NearbyTouristAttractionPinpoint';
import { useGetAroundNavigate, useGetDestinationInfo } from '../lib';
import CurrentDeviceLocation from '../../components/CurrentDeviceLocation';
import { BottomSheet } from '@/components';
import { TourDetail } from '@/pages/tour/geotrip/components';
import { useState } from 'react';

export default function GeoAroundTouristMap() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(true);
  const { currentTourInfo, destination } = useGetDestinationInfo();
  const {
    aroundTouristObjects,
    contentTypeIdGroup,
    handleAdditionalMarkerClick,
    removeMakerFilter,
  } = useGetAroundNavigate(destination);

  return (
    <Map center={destination} className="w-full h-full" level={7}>
      <AroundTouristNavigate
        contentTypeIdGroup={contentTypeIdGroup}
        handleAdditionalMarkerClick={handleAdditionalMarkerClick}
        removeMakerFilter={removeMakerFilter}
      />

      <CurrentDeviceLocation />
      {aroundTouristObjects.map(tourist => {
        return <NearbyTouristAttractionPinPoint {...tourist} />;
      })}
      <MapMarker
        zIndex={999}
        position={destination}
        onClick={() => setIsOpenBottomSheet(true)}
      ></MapMarker>
      <div className="absolute w-full h-11/12 bottom-0 left-0">
        <BottomSheet
          isOpen={isOpenBottomSheet}
          onClose={() => setIsOpenBottomSheet(false)}
          initialY="65%"
          minHeight={200}
        >
          <BottomSheet.Content>
            <TourDetail {...currentTourInfo} />
          </BottomSheet.Content>
        </BottomSheet>
      </div>
    </Map>
  );
}
