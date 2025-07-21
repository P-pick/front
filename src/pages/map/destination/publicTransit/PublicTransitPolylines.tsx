import { MapMarker, Polyline } from 'react-kakao-maps-sdk';
import type { TransitLeg } from './type';
import { getCoordinatesPointLines } from '../lib';
import { useStore } from 'zustand';
import { useMapLevel } from '../store';

interface PublicTransitProps {
  leg: TransitLeg;
}

export default function PublicTransitPolylines({ leg }: PublicTransitProps) {
  const { mapLevel } = useStore(useMapLevel);
  if (leg.mode === 'WALK') {
    return (
      <>
        {leg.steps?.map((step, index) => {
          const coordinates = step.linestring
            .split(' ')
            .map(coord => coord.split(',').map(Number));

          const path = getCoordinatesPointLines(coordinates);

          return (
            <Polyline
              key={`public-transit-walk-${index}-${step.description}`}
              path={path}
              strokeColor="#999999"
              strokeStyle={'dash'}
              strokeOpacity={0.8}
              strokeWeight={5}
            />
          );
        })}
      </>
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
      <>
        <Polyline
          key={`public-transit-subway-${leg.routeId}-${leg.start.name}`}
          path={path}
          strokeColor={`#${leg.routeColor}`}
          strokeOpacity={0.8}
          strokeWeight={5}
        />
        {mapLevel < 6 &&
          leg.passStopList.stationList.map(station => {
            return (
              <MapMarker
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
      </>
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
      <>
        <Polyline
          key={`public-transit-bus-${leg.routeId}-${leg.start.name}`}
          path={path}
          strokeColor={`#${leg.routeColor}`}
          strokeOpacity={0.8}
          strokeWeight={5}
        />
        {mapLevel < 6 &&
          leg.passStopList.stationList.map(stop => {
            return (
              <MapMarker
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
      </>
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
      <>
        <Polyline
          key={`public-transit-train-${leg.routeId}-${leg.start.name}`}
          path={path}
          strokeColor={`#${leg.routeColor}`}
          strokeOpacity={0.8}
          strokeWeight={5}
        />
        {mapLevel < 6 &&
          leg.passStopList.stationList.map(station => {
            return (
              <MapMarker
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
      </>
    );
  }
}
