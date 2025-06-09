import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useGetAroundNavigate } from '../../lib/aroundNavigate';
import AroundTouristNavigate from './AroundTouristNavigate';
import CurrentDeviceLocation from '../CurrentDeviceLocation';
import NearbyTouristAttractionPinPoint from './NearbyTouristAttractionPinpoint';

const destination = {
  latitude: 37.629362,
  longitude: 127.095991,
};

export default function GeoAroundTouristMap() {
  const {
    aroundTouristObjects,
    contentTypeIdGroup,
    handleAdditionalMarkerClick,
    removeMakerFilter,
  } = useGetAroundNavigate(destination);

  return (
    <Map
      center={{
        lat: destination.latitude,
        lng: destination.longitude,
      }}
      className="w-full h-full"
      level={7}
    >
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
        position={{ lat: destination.latitude, lng: destination.longitude }}
      >
        관광지
      </MapMarker>
    </Map>
  );
}
