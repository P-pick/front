import { useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { useQuery } from '@tanstack/react-query';
import { Map } from 'react-kakao-maps-sdk';

import {
  FollowAlong,
  ResizingMap,
  useFollowAlongStore,
  useMapLevelStore,
} from '@/features/navigate';
import { CurrentDeviceLocation, EndPin, StartPin } from '@/features/map';
import {
  getPublicTransitFollowList,
  Itineraries,
  PublicTransitDetail,
  PublicTransitPolylines,
  TransitCountList,
} from '@/features/publicTransit';

import { destinationQueries } from '@/entities/navigate';

import type { GeoTripLocation } from '@/shared';
import TransitFollowList from './TransitFollowList';

interface PublicTransitProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function PublicTransit({ start, end }: PublicTransitProps) {
  const { mapLevel, setMapLevel } = useStore(useMapLevelStore);
  const { isFollowAlong } = useStore(useFollowAlongStore);
  const [selectedTransitOption, setSelectedTransitOption] = useState(-1);

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

  const points = useMemo(() => {
    if (itineraries && selectedTransitOption !== -1) {
      return getPublicTransitFollowList(
        itineraries[selectedTransitOption],
      ).flatMap(follow => follow.path);
    }
  }, [itineraries, selectedTransitOption]);

  if (selectedTransitOption !== -1) {
    return (
      <Map
        id="publictransit-map"
        className="relative w-full h-full"
        center={start}
        level={mapLevel}
        onZoomChanged={map => {
          setMapLevel(map.getLevel());
        }}
      >
        <CurrentDeviceLocation />
        {itineraries &&
          itineraries[selectedTransitOption].legs.map(leg => (
            <PublicTransitPolylines leg={leg} />
          ))}
        <StartPin
          position={{
            lat: Number(requestParams?.startY),
            lng: Number(requestParams?.startX),
          }}
        />
        <EndPin
          position={{
            lat: Number(requestParams?.endY),
            lng: Number(requestParams?.endX),
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 w-full max-h-4/7  flex flex-col">
          {points && (
            <ResizingMap points={points} viewBounds={[0, 0, 400, 0]} />
          )}
          {!isFollowAlong && itineraries && (
            <>
              <PublicTransitDetail
                itineraries={itineraries[selectedTransitOption]}
                setSelectedTransitOption={setSelectedTransitOption}
              />
              <FollowAlong />
            </>
          )}
          {isFollowAlong && itineraries && (
            <TransitFollowList itinerary={itineraries[selectedTransitOption]} />
          )}
        </div>
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
