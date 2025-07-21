import { useQuery } from '@tanstack/react-query';
import type { GeoTripLocation } from '@/pages/types';
import destinationQueries from '../service/queryOptions';
import TransitCountList from './TransitCountList';
import Itineraries from './Itineraries';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useStore } from 'zustand';
import { useMapLevel } from '../store';
import { CurrentDeviceLocation } from '../../components';
import PublicTransitPolylines from './PublicTransitPolylines';

interface PublicTransitProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function PublicTransit({ start, end }: PublicTransitProps) {
  const { mapLevel, setMapLevel } = useStore(useMapLevel);
  const [SelectedTransitOption, setSelectedTransitOption] = useState(-1);

  const publicFeatures = useQuery(
    destinationQueries.transit({
      startX: start.lng,
      startY: start.lat,
      endX: end.lng,
      endY: end.lat,
    }),
  );

  const requestParams = publicFeatures.data?.metaData?.requestParameters;
  const itineraries = publicFeatures.data?.metaData?.plan.itineraries;

  if (SelectedTransitOption !== -1) {
    return (
      <Map
        id="publictransit-map"
        className="flex-1 relative w-full h-full"
        center={start}
        level={mapLevel}
        onZoomChanged={map => {
          setMapLevel(map.getLevel());
        }}
      >
        <CurrentDeviceLocation />
        {itineraries &&
          itineraries[SelectedTransitOption].legs.map(leg => (
            <PublicTransitPolylines leg={leg} />
          ))}
        <MapMarker
          position={{
            lat: Number(requestParams?.startY),
            lng: Number(requestParams?.startX),
          }}
          image={{
            src: '/startPin.svg',
            size: {
              width: 45,
              height: 59,
            },
            options: {
              offset: {
                x: 23,
                y: 46,
              },
            },
          }}
        />
        <MapMarker
          position={{
            lat: Number(requestParams?.endY),
            lng: Number(requestParams?.endX),
          }}
          image={{
            src: '/endPin.svg',
            size: {
              width: 45,
              height: 59,
            },
            options: {
              offset: {
                x: 23,
                y: 46,
              },
            },
          }}
        />
      </Map>
    );
  }

  return (
    <div className="absolute bg-white w-full h-[80%]">
      {requestParams && <TransitCountList requestParams={requestParams} />}
      <ul className="scroll-auto w-full h-full overflow-y-scroll">
        {itineraries?.map(({ fare, legs, ...etc }, index) => {
          return (
            <li
              className="border-b-1 border-gray-300 p-2 active:bg-gray-100"
              onClick={() => setSelectedTransitOption(index)}
              key={`${etc.totalTime}-${index}`}
            >
              <Itineraries fare={fare} legs={legs} {...etc} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
