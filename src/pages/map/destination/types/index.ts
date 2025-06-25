import type {
  CarFeatures,
  SearchOption as CarSearchOptions,
  TurnType as CarTurnType,
  ResponseRoadType,
  FacilityType as CarFacilityType,
} from './carType';
import type {
  PedestrianFeatures,
  SearchOption as PedestrianSearchOptions,
  TurnType as PedestrianTurnType,
  FacilityType as PedestrianFacilityType,
} from './pedestrianType';

export type {
  TollgateFareOption as CarTollgateFareOption,
  RoadType as CarRoadType,
  DataDirectionOption,
  CoordType as CarCoordType,
  UncetaintyA as CarUncetaintyA,
  SearchOption as CarSearchOption,
  DetailPosFlag as CarDetailPosFlag,
  TotalValue as CarTotalValue,
  Traffic as CarTraffic,
  TurnType as CarTurnType,
  PointType as CarPointType,
  PointGeometry as CarPointGeometry,
  LineStringGeometry as CarLineStringGeometry,
  PointProperties as CarPointProperties,
  LineStringProperties as CarLineStringProperties,
  CarType,
  CarFeatures,
  CarResponse,
  CarRequestBody,
} from './carType';

export type {
  CategoryRoadType as PedestrianCategoryRoadType,
  CoordType as PedestrianCoordType,
  LineStringGeometry as PedestrianLineStringGeometry,
  PointGeometry as PedestrianPointGeometry,
  PointType as PedestrianPointType,
  SearchOption as PedestrianSearchOption,
  SortType as PedestrianSortType,
  RoadType as PedestrianRoadType,
  TurnType as PedestrianTurnType,
  FacilityType as PedestrianFacilityType,
  PointProperties as PedestrianPointProperties,
  LineStringProperties as PedestrianLineStringProperties,
  PedestrianFeatures,
  PedestrianResponse,
  PedestrianRequestBody,
} from './pedestrianType';

export type TransportationType =
  | 'pedestrian'
  | 'car'
  | 'bicycle'
  | 'public-transportation';

export interface FollowBase {
  id: string;
  path: {
    lat: number;
    lng: number;
  }[];
  description: string;
  distance?: number;
  index: number;
}

export interface PedestrianFollowFeature extends FollowBase {
  totalTime?: number;
  totalDistance?: number;
  turnType: PedestrianTurnType;
  facilityType?: PedestrianFacilityType;
}

export interface CarFollowFeature extends FollowBase {
  totalTime?: number;
  totalDistance?: number;
  taxiFare?: number;
  turnType: CarTurnType;
  roadType?: ResponseRoadType;
  facilityType?: CarFacilityType;
}

export type PedestrianOptionNames =
  | '추천'
  | '추천 + 대로우선'
  | '최단거리'
  | '최단거리 + 계단제외';
export type CarOptionNames =
  | '추천도로'
  | '무료우선'
  | '최소시간'
  | '초보운전'
  | '고속도로우선'
  | '최단거리 + 유/무료'
  | '이륜차도로우선'
  | '어린이보호구역 회피';

export type PolyFeatures = PedestrianFeatures[] | CarFeatures[] | undefined;
export type SearchOptions = CarSearchOptions | PedestrianSearchOptions;
export type MultiplePathResponse = {
  optionId: SearchOptions;
  name: PedestrianOptionNames | CarOptionNames;
  features: PolyFeatures;
};
