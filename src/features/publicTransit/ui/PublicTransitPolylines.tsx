import { Fragment } from 'react';
import { useStore } from 'zustand';
import { MapMarker, Polyline } from 'react-kakao-maps-sdk';
import {
  getCoordinatesPointLines,
  useMapLevelStore,
} from '@/features/navigate';
import type { PUBLICTRANSIT } from '@/entities/navigate';
import { useMapController } from '@/features/map';

interface PublicTransitProps {
  itinerary: PUBLICTRANSIT.Itinerary;
}

export default function PublicTransitPolylines({
  itinerary,
}: PublicTransitProps) {
  const { handleGoToFollowPin } = useMapController();
  const { mapLevel } = useStore(useMapLevelStore);

  // startIndices 계산
  const startIndices = (() => {
    const arr: number[] = [];
    let running = 0;
    for (const leg of itinerary.legs) {
      arr.push(running);
      let size = 0;
      if (leg.mode === 'WALK') {
        size = leg.steps?.length ?? 0;
      } else {
        // SUBWAY/BUS/TRAIN 등은 passStopList.stationList 길이를 사용
        size = leg.passStopList?.stationList?.length ?? 0;
      }
      running += size;
    }
    return arr;
  })();

  return (
    <>
      {itinerary.legs.map((leg, legIndex) => {
        const startIndex = startIndices[legIndex];

        if (leg.mode === 'WALK') {
          return (
            <Fragment key={`public-transit-walk-${legIndex}`}>
              {leg.steps?.map((step, index) => {
                const globalIndex = startIndex + index;
                const coordinates = step.linestring
                  .split(' ')
                  .map(coord => coord.split(',').map(Number));
                const path = getCoordinatesPointLines(coordinates);

                return (
                  <Fragment key={`walk-${globalIndex}`}>
                    <Polyline
                      path={path}
                      strokeColor="#999999"
                      strokeOpacity={0.8}
                      strokeWeight={5}
                    />
                    {mapLevel < 6 && (
                      <MapMarker
                        position={path[0]}
                        image={{
                          src: '/pointIcon.svg',
                          size: { width: 12, height: 12 },
                          options: { offset: { x: 6, y: 6 } },
                        }}
                        zIndex={2}
                        onClick={() =>
                          handleGoToFollowPin(path[0], globalIndex)
                        }
                      />
                    )}
                  </Fragment>
                );
              })}
            </Fragment>
          );
        }

        // SUBWAY / BUS / TRAIN
        if (
          leg.mode === 'SUBWAY' ||
          leg.mode === 'BUS' ||
          leg.mode === 'TRAIN'
        ) {
          if (!leg.passShape) return null;

          const coordinates = leg.passShape.linestring
            .split(' ')
            .map(coord => coord.split(',').map(Number));
          const path = getCoordinatesPointLines(coordinates);

          return (
            <Fragment
              key={`public-transit-${leg.mode.toLowerCase()}-${leg.routeId}`}
            >
              <Polyline
                path={path}
                strokeColor={`#${leg.routeColor}`}
                strokeOpacity={0.8}
                strokeWeight={5}
              />
              {mapLevel < 6 &&
                leg.passStopList?.stationList?.map((station, i) => {
                  const globalIndex = startIndex + i;
                  return (
                    <MapMarker
                      key={`stop-${globalIndex}-${station.stationID}`}
                      onClick={() => handleGoToFollowPin(path[0], globalIndex)}
                      position={{
                        lat: Number(station.lat),
                        lng: Number(station.lon),
                      }}
                      image={{
                        src:
                          leg.mode === 'SUBWAY'
                            ? `/publictransit/subway_${leg.type}line.svg`
                            : leg.mode === 'BUS'
                              ? `/publictransit/bus_${leg.type}.svg`
                              : '/pointIcon.svg',
                        size: { width: 24, height: 24 },
                      }}
                    />
                  );
                })}
            </Fragment>
          );
        }

        return null;
      })}
    </>
  );
}
