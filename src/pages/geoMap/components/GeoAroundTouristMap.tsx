import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useAroundTouristMapQuery from '../service/getAroundTouristMapData';
import { useState } from 'react';
import type { AroundContentTypeId } from '../types';
import AroundTouristNavigate from './AroundTouristNavigate';
import CurrentDeviceLocation from './CurrentDeviceLocation';
import { markerImageMap } from '@/pages/const/MARKER';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function GeoAroundTouristMap() {
  const [selectedContentTypeId, setSelectedContentTypeId] =
    useState<AroundContentTypeId>('12');
  const aroundTouristObjects = useAroundTouristMapQuery({
    location: {
      latitude: destination.lat,
      longitude: destination.lng,
    },
    contentTypeId: selectedContentTypeId,
  });

  return (
    <Map
      center={{
        lat: destination.lat,
        lng: destination.lng,
      }}
      className="w-full h-full"
      level={7}
    >
      <AroundTouristNavigate
        selectedContentTypeId={selectedContentTypeId}
        setSelectedContentTypeId={setSelectedContentTypeId}
      />
      <MapMarker position={{ lat: destination.lat, lng: destination.lng }}>
        관광지
      </MapMarker>
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
    </Map>
  );
}
