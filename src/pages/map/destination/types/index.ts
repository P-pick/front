import type {
  CarFeatures,
  SearchOption as CarSearchOptions,
  ResponseRoadType,
  FacilityType as CarFacilityType,
} from './carType';
import type {
  PedestrianFeatures,
  SearchOption as PedestrianSearchOptions,
  FacilityType as PedestrianFacilityType,
} from './pedestrianType';
import type { Itinerary } from './transitType';

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
  FacilityType as PedestrianFacilityType,
  PointProperties as PedestrianPointProperties,
  LineStringProperties as PedestrianLineStringProperties,
  PedestrianFeatures,
  PedestrianResponse,
  PedestrianRequestBody,
} from './pedestrianType';

export type { TransitPlanResponse } from './transitType';

export type TurnType =
  | 11 //직진
  | 12 //좌회전
  | 13 //우회전
  | 14 //유턴
  | 16 //8시 방향 좌회전
  | 17 //10시 방향 좌회전
  | 18 //2시 방향 우회전
  | 19 //4시 방향 우회전
  | 184 //경유지
  | 185 //첫 번째 경유지
  | 186 //두 번째 경유지
  | 187 //세 번째 경유지
  | 188 //네 번째 경유지
  | 189 //다섯 번째 경유지
  | 121 //터널진입
  | 125 //육교
  | 126 //지하보도
  | 127 //계단 진입
  | 128 // 경사로 진입
  | 129 //계단 + 경사로 진입
  | 200 // 출발지
  | 201 // 목적지
  | 211 //횡단보도
  | 212 //좌측 횡산보도
  | 213 //우측 횡단보도
  | 214 // 8시 방향 횡단보도
  | 215 // 10시 방향 횡단보도
  | 216 // 2시 방향 횡단보도
  | 217 // 4시 방향 횡단보도
  | 218; // 엘리베이터

export type TransportationType =
  | 'pedestrian'
  | 'car'
  | 'bicycle'
  | 'publictransit';

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
  turnType: TurnType;
  facilityType?: PedestrianFacilityType;
}

export interface CarFollowFeature extends FollowBase {
  totalTime?: number;
  totalDistance?: number;
  taxiFare?: number;
  turnType: TurnType;
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

export type PolyFeatures =
  | PedestrianFeatures[]
  | CarFeatures[]
  | Itinerary[]
  | undefined;
export type SearchOptions = CarSearchOptions | PedestrianSearchOptions;
export type MultiplePathResponse = {
  optionId: SearchOptions;
  name: PedestrianOptionNames | CarOptionNames;
  features: PolyFeatures;
};
