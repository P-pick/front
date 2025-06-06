import { Map, MapMarker } from 'react-kakao-maps-sdk';
import AroundTouristNavigate from './AroundTouristNavigate';
import CurrentDeviceLocation from './CurrentDeviceLocation';
import { markerImageMap } from '@/pages/const/MARKER';
import useAroundTouristQuery from '../service/getAroundTouristMapData';
import type { AroundContentTypeId } from '../types';
import { useState } from 'react';

const destination = {
  latitude: 37.629362,
  longitude: 127.095991,
};

export default function GeoAroundTouristMap() {
  const [selectedContentTypeId, setSelectedContentTypeId] =
    useState<AroundContentTypeId>('12');
  const { aroundTouristObjects, setAroundTouristObjects } =
    useAroundTouristQuery(destination, selectedContentTypeId);

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
        setSelectedContentTypeId={setSelectedContentTypeId}
        setAroundTouristObjects={setAroundTouristObjects}
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
