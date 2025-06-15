import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useGetAroundNavigate } from '../../lib/aroundNavigate';
import AroundTouristNavigate from './AroundTouristNavigate';
import CurrentDeviceLocation from '../CurrentDeviceLocation';
import NearbyTouristAttractionPinPoint from './NearbyTouristAttractionPinpoint';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function GeoAroundTouristMap() {
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
      <MapMarker zIndex={999} position={destination}>
        관광지
      </MapMarker>
    </Map>
  );
}
