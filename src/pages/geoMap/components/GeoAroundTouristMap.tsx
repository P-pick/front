import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import type { MarkerType } from '../types';
import AroundTouristNavigate from './AroundTouristNavigate';
import CurrentDeviceLocation from './CurrentDeviceLocation';
import { markerImageMap } from '@/pages/const/MARKER';
import type { TourItem } from '@/pages/types';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function GeoAroundTouristMap() {
  const [aroundTouristObjects, setAroundTouristObjects] =
    useState<TourItem[]>();

  const [contentTypeIdGroup, setContentTypeIdGroup] = useState<MarkerType[]>([
    { contentTypeId: '12', imageSrc: markerImageMap['12'], altText: '관광지' },
  ]);

  return (
    <Map
      center={{
        lat: destination.lat,
        lng: destination.lng,
      }}
      className="w-full h-full"
      level={7}
    >
      <AroundTouristNavigate contentTypeIdGroup={contentTypeIdGroup} />

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
        position={{ lat: destination.lat, lng: destination.lng }}
      >
        관광지
      </MapMarker>
    </Map>
  );
}
