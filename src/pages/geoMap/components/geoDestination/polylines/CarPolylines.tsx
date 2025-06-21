import type { CarFeatures, CarSearchOption } from '@/pages/geoMap/types';
import Point from './Point';
import { Polyline } from 'react-kakao-maps-sdk';
import type { PointProperties } from '@/pages/geoMap/types/carType';
import { TRAFFIC } from '@/pages/const/TMAP';
import { useTransportation } from '@/pages/geoMap/store';
import { useStore } from 'zustand';
import { useMemo } from 'react';

const getCoordinatesPointLines = (coords: number[][]) => {
  return coords.map(coord => ({
    lat: coord[1],
    lng: coord[0],
  }));
};

const getCheckedTrafficLevel = (level: number) => {
  switch (level) {
    case 0:
      return TRAFFIC.none; // 정보없음
    case 1:
      return TRAFFIC.normal; // 원활
    case 2:
      return TRAFFIC.slowly; // 서행
    case 3:
      return TRAFFIC.delay; // 지체
    case 4:
      return TRAFFIC.delay; // 정체
    default:
      return TRAFFIC.normal;
  }
};

export default function CarPolylines({
  destination = [],
  searchOption,
}: {
  destination: CarFeatures[];
  searchOption: CarSearchOption;
}) {
  const { searchOptions: selectedSearchOption } = useStore(useTransportation);

  const isSelectedOption = useMemo(() => {
    return searchOption === selectedSearchOption;
  }, [searchOption]);

  return destination.flatMap(feature => {
    const { geometry, properties } = feature;

    if (geometry.type === 'Point') {
      const path = [
        { lat: geometry.coordinates[1], lng: geometry.coordinates[0] },
      ];
      const spProperties = properties as PointProperties;

      return (
        <>
          {isSelectedOption && (
            <Point
              key={`car-point-${searchOption}-${spProperties.index}`}
              position={path[0]}
              pointType={spProperties.pointType}
              zIndex={2}
            />
          )}
        </>
      );
    }

    if (geometry.type === 'LineString') {
      const coords = geometry.coordinates;

      if (!geometry.traffic || geometry.traffic.length === 0) {
        const path = getCoordinatesPointLines(coords);

        return (
          <Polyline
            key={`car-lineString-${searchOption}-${properties.index}`}
            path={path}
            strokeColor={isSelectedOption ? '#24aa24' : '#999999'}
            strokeOpacity={0.8}
            strokeWeight={5}
            zIndex={isSelectedOption ? 2 : 1}
          />
        );
      }

      return geometry.traffic.map(([start, end, level]) => {
        const segmentCoords = coords.slice(start, end + 1);
        const path = getCoordinatesPointLines(segmentCoords);
        const color = getCheckedTrafficLevel(level);

        return (
          <Polyline
            key={`car-traffic-${searchOption}-${properties.index}-${start}-${end}`}
            path={path}
            strokeColor={isSelectedOption ? color : '#999999'}
            strokeOpacity={0.8}
            strokeWeight={5}
            zIndex={isSelectedOption ? 2 : 1}
          />
        );
      });
    }
  });
}
