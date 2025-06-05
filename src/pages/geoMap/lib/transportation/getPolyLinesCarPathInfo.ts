import { TRAFFIC } from '@/const/TMAP';
import type { CarResponse } from '../../types';

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

const getCarDestinationPath = (destination: CarResponse['features'] = []) => {
  return destination.flatMap(feature => {
    const { geometry, properties } = feature;

    if (geometry.type === 'Point') {
      return [
        {
          id: `${properties.index}`,
          path: [
            {
              lat: geometry.coordinates[1],
              lng: geometry.coordinates[0],
            },
          ],
          color: '#888888 ',
        },
      ];
    }

    if (geometry.type === 'LineString') {
      const coords = geometry.coordinates;

      if (!geometry.traffic || geometry.traffic.length === 0) {
        const path = getCoordinatesPointLines(coords);

        return [
          {
            id: `${properties.index}-full`,
            path,
            color: '#24aa24',
          },
        ];
      }

      return geometry.traffic.map(([start, end, level]) => {
        const segmentCoords = coords.slice(start, end + 1);
        const path = getCoordinatesPointLines(segmentCoords);
        const color = getCheckedTrafficLevel(level);

        return {
          id: `${properties.index}-${start}-${end}`,
          path,
          color,
        };
      });
    }

    return [];
  });
};

export default getCarDestinationPath;
