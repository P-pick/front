import type { FollowBase, PUBLICTRANSIT } from '@/entities/navigate';

export default function getPublicTransitFollowList(
  itinerary: PUBLICTRANSIT.Itinerary,
) {
  const followList = itinerary.legs.flatMap((leg, legIndex): FollowBase[] => {
    if (leg.mode === 'WALK') {
      return (
        leg.steps?.flatMap((step, StepIndex) => {
          const coords = step.linestring
            .split(' ')
            .map(line => line.split(',').map(Number));
          return {
            id: leg.mode + legIndex + '-' + StepIndex,
            path: [
              {
                lat: coords[0][1],
                lng: coords[0][0],
              },
            ],
            description: step.description,
            distance: step.distance,
            index: legIndex,
          };
        }) || []
      );
    }
    if (leg.mode === 'BUS') {
      return leg.passStopList.stationList.flatMap((station, stationIndex) => {
        return {
          id: leg.mode + legIndex + '-' + stationIndex,
          path: [
            {
              lat: Number(station.lat),
              lng: Number(station.lon),
            },
          ],
          description: station.stationName,
          index: legIndex,
        };
      });
    }
    if (leg.mode === 'SUBWAY') {
      return leg.passStopList.stationList.flatMap((station, stationIndex) => {
        return {
          id: leg.mode + legIndex + '-' + stationIndex,
          path: [
            {
              lat: Number(station.lat),
              lng: Number(station.lon),
            },
          ],
          description: station.stationName,
          index: legIndex,
        };
      });
    }
    return [];
  });
  return followList;
}
