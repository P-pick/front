import type {
  CarFeatures,
  CarOptionNames,
  CarRequestBody,
  CarSearchOption,
  MultiplePathResponse,
  PedestrianFeatures,
  PedestrianOptionNames,
  PedestrianRequestBody,
  SearchOptions,
} from '../types';
import type { TransitRequestBody } from '../types/transitType';
import getCarDestinationPathInfo from './getCarData';
import getPedestrianDestinationPathInfo from './getPedestrianData';
import getTransitDestinationPathInfo from './getTransitData';

const CAR_SEARCH_OPTIONS = [
  {
    id: 0,
    name: '추천도로',
  },
  {
    id: 1,
    name: '무료우선',
  },
  {
    id: 2,
    name: '최소시간',
  },
  {
    id: 3,
    name: '초보운전',
  },
  {
    id: 4,
    name: '고속도로우선',
  },
  {
    id: 10,
    name: '최단거리 + 유/무료',
  },
  {
    id: 12,
    name: '이륜차도로우선',
  },
  {
    id: 19,
    name: '어린이보호구역 회피',
  },
] as const;

const PEDESTRAIN_SEARCH_OPTIONS = [
  {
    id: 0,
    name: '추천',
  },
  {
    id: 4,
    name: '추천 + 대로우선',
  },
  {
    id: 10,
    name: '최단거리',
  },
  {
    id: 30,
    name: '최단거리 + 계단제외',
  },
] as const;

const getPathResultFulfilled = (
  results: PromiseSettledResult<{
    optionId: SearchOptions;
    name: CarOptionNames | PedestrianOptionNames;
    features: CarFeatures[] | PedestrianFeatures[];
  }>[],
) => {
  return results
    .filter(result => result.status === 'fulfilled')
    .map(
      result => (result as PromiseFulfilledResult<MultiplePathResponse>).value,
    );
};

const getCarDestinationQueryOptions = (baseRequest: CarRequestBody) => ({
  queryKey: [
    'carDestination',
    baseRequest.startX,
    baseRequest.startY,
    baseRequest.endX,
    baseRequest.endY,
    baseRequest.startName,
    baseRequest.endName,
  ],
  queryFn: async (): Promise<MultiplePathResponse[]> => {
    const results = await Promise.allSettled(
      CAR_SEARCH_OPTIONS.map(searchOption =>
        getCarDestinationPathInfo({
          ...baseRequest,
          searchOption: searchOption.id as CarSearchOption,
        }).then(res => ({
          optionId: searchOption.id as CarSearchOption,
          name: searchOption.name as CarOptionNames,
          features: res.features,
        })),
      ),
    );

    return getPathResultFulfilled(results);
  },
});

const getPedestrianDestinationQueryOptions = (
  baseRequest: PedestrianRequestBody,
) => ({
  queryKey: [
    'pedestrianDestination',
    baseRequest.startX,
    baseRequest.startY,
    baseRequest.endX,
    baseRequest.endY,
    baseRequest.startName,
    baseRequest.endName,
  ],
  queryFn: async (): Promise<MultiplePathResponse[]> => {
    const results = await Promise.allSettled(
      PEDESTRAIN_SEARCH_OPTIONS.map(searchOption =>
        getPedestrianDestinationPathInfo({
          ...baseRequest,
          searchOption: searchOption.id,
        }).then(res => ({
          optionId: searchOption.id,
          name: searchOption.name,
          features: res.features,
        })),
      ),
    );

    return getPathResultFulfilled(results);
  },
});

const getTransitDestinationQueryOptions = (
  transitRequest: TransitRequestBody,
) => ({
  queryKey: [
    'transitDestination',
    transitRequest.startX,
    transitRequest.startY,
    transitRequest.endX,
    transitRequest.endY,
  ],
  queryFn: async (): Promise<MultiplePathResponse[]> => {
    const res = await getTransitDestinationPathInfo(transitRequest);

    return res.metaData.plan.itineraries.map((itinerary, index) => {
      const features: PedestrianFeatures[] = [];

      itinerary.legs.forEach((leg, legIndex) => {
        if (!leg.passShape) return;

        const coords = leg.passShape.linestring
          .split(';')
          .map(pair => pair.split(',').map(Number) as [number, number]);

        features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coords,
          },
          properties: {
            index: legIndex,
            lineIndex: index,
            name: leg.mode,
            description: `${leg.mode} - ${leg.start.name} → ${leg.end.name}`,
            distance: leg.distance,
            time: leg.sectionTime,
            roadType: 21,
            categoryRoadType: 0,
            facilityType: 1,
            facilityName: '',
          },
        });
      });

      return {
        optionId: 0,
        name: '추천',
        features,
      };
    });
  },
});

const destinationQueries = {
  car: getCarDestinationQueryOptions,
  pedestrian: getPedestrianDestinationQueryOptions,
  transit: getTransitDestinationQueryOptions,
};

export default destinationQueries;
