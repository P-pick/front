import { Map, MapMarker } from 'react-kakao-maps-sdk';
import AroundTouristNavigate from './AroundTouristNavigate';
import CurrentDeviceLocation from './CurrentDeviceLocation';
import { markerImageMap } from '@/pages/const/MARKER';
import { useGetAroundNavigate } from '../lib/aroundNavigate';

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
      {aroundTouristObjects?.map(tourist => {
        return (
          <MapMarker
            key={tourist.contentid}
            position={{
              lat: tourist.mapy!,
              lng: tourist.mapx!,
            }}
            image={{
              src: markerImageMap[tourist.contenttypeid],
              size: {
                width: 38,
                height: 50,
              },
            }}
          ></MapMarker>
        );
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
