import { useStore } from 'zustand';
import { MapMarker, Polyline } from 'react-kakao-maps-sdk';
import {
  getCoordinatesPointLines,
  useMapLevelStore,
} from '@/features/navigate';

import type { PUBLICTRANSIT } from '@/entities/navigate';
import { useMapController } from '@/features/map';
import React from 'react';

interface PublicTransitProps {
  itinerary: PUBLICTRANSIT.Itinerary;
}

export default function PublicTransitPolylines({
  itinerary,
}: PublicTransitProps) {
  const { handleGoToFollowPin } = useMapController();
  const { mapLevel } = useStore(useMapLevelStore);

  return itinerary.legs.map((leg, legIndex) => {
    if (leg.mode === 'WALK') {
      return (
        <React.Fragment key={`public-transit-walk-${legIndex}`}>
          {leg.steps?.map((step, index) => {
            const coordinates = step.linestring
              .split(' ')
              .map(coord => coord.split(',').map(Number));

            const path = getCoordinatesPointLines(coordinates);

            return (
              <React.Fragment key={`public-transit-walk-${legIndex}-${index}`}>
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
                      options: {
                        offset: {
                          x: 6,
                          y: 6,
                        },
                      },
                    }}
                    zIndex={2}
                    onClick={() => handleGoToFollowPin(path[0], legIndex)}
                  />
                )}
              </React.Fragment>
            );
          })}
        </React.Fragment>
      );
    }

    if (leg.mode === 'SUBWAY') {
      if (!leg.passShape) {
        return null;
      }
      const coordinates = leg.passShape.linestring
        .split(' ')
        .map(coord => coord.split(',').map(Number));

      const path = getCoordinatesPointLines(coordinates);

      return (
        <React.Fragment key={`public-transit-subway-${leg.routeId}`}>
          <Polyline
            path={path}
            strokeColor={`#${leg.routeColor}`}
            strokeOpacity={0.8}
            strokeWeight={5}
          />
          {mapLevel < 6 &&
            leg.passStopList.stationList.map(station => {
              return (
                <MapMarker
                  onClick={() => handleGoToFollowPin(path[0], legIndex)}
                  key={station.stationID}
                  position={{
                    lat: Number(station.lat),
                    lng: Number(station.lon),
                  }}
                  image={{
                    src: `/publictransit/subway_${leg.type}line.svg`,
                    size: { width: 24, height: 24 },
                  }}
                ></MapMarker>
              );
            })}
        </React.Fragment>
      );
    }

    if (leg.mode === 'BUS') {
      if (!leg.passShape) {
        return null;
      }
      const coordinates = leg.passShape.linestring
        .split(' ')
        .map(coord => coord.split(',').map(Number));

      const path = getCoordinatesPointLines(coordinates);

      return (
        <React.Fragment key={`public-transit-bus-${leg.routeId}`}>
          <Polyline
            path={path}
            strokeColor={`#${leg.routeColor}`}
            strokeOpacity={0.8}
            strokeWeight={5}
          />
          {mapLevel < 6 &&
            leg.passStopList.stationList.map(stop => {
              return (
                <MapMarker
                  onClick={() => handleGoToFollowPin(path[0], legIndex)}
                  key={stop.stationID}
                  position={{
                    lat: Number(stop.lat),
                    lng: Number(stop.lon),
                  }}
                  image={{
                    src: `/publictransit/bus_${leg.type}.svg`,
                    size: { width: 24, height: 24 },
                  }}
                ></MapMarker>
              );
            })}
        </React.Fragment>
      );
    }

    if (leg.mode === 'TRAIN') {
      if (!leg.passShape) {
        return null;
      }
      const coordinates = leg.passShape.linestring
        .split(' ')
        .map(coord => coord.split(',').map(Number));
      const path = getCoordinatesPointLines(coordinates);

      return (
        <React.Fragment key={`public-transit-train-${leg.routeId}`}>
          <Polyline
            path={path}
            strokeColor={`#${leg.routeColor}`}
            strokeOpacity={0.8}
            strokeWeight={5}
          />
          {mapLevel < 6 &&
            leg.passStopList.stationList.map(station => {
              return (
                <MapMarker
                  onClick={() => handleGoToFollowPin(path[0], legIndex)}
                  key={station.stationID}
                  position={{
                    lat: Number(station.lat),
                    lng: Number(station.lon),
                  }}
                  image={{
                    src: '/pointIcon.svg',
                    size: { width: 24, height: 24 },
                  }}
                ></MapMarker>
              );
            })}
        </React.Fragment>
      );
    }
  });
}
