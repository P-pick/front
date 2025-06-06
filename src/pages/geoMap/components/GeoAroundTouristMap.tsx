import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';
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
        position={{ lat: destination.lat, lng: destination.lng }}
      >
        관광지
      </MapMarker>
    </Map>
  );
}
