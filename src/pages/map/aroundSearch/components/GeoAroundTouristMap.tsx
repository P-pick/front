import { Map, MapMarker } from 'react-kakao-maps-sdk';
import AroundTouristNavigate from './AroundTouristNavigate';
import NearbyTouristAttractionPinPoint from './NearbyTouristAttractionPinpoint';
import { useGetAroundNavigate } from '../lib';
import CurrentDeviceLocation from '../../components/CurrentDeviceLocation';

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
