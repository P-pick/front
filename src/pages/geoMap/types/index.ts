import type { CarFeatures, SearchOption as CarSearchOptions } from './carType';
import type {
  PedestrianFeatures,
  SearchOption as PedestrianSearchOptions,
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
  facilityType as PedestrianFacilityType,
  PointProperties as PedestrianPointProperties,
  LineStringProperties as PedestrianLineStringProperties,
  PedestrianFeatures,
  PedestrianResponse,
  PedestrianRequestBody,
} from './pedestrianType';

export type AroundContentTypeId =
  | '' // 없음
  | '12' // 관광지
  | '14' // 문화시설
  | '15' // 축제공연행사
  | '25' // 여행코스
  | '28' // 레포츠
  | '32' // 숙박
  | '38' // 쇼핑
  | '39'; // 음식점

export type TransportationType =
  | 'pedestrian'
  | 'car'
  | 'bicycle'
  | 'public-transportation';

export type MarkerType = {
  contentTypeId: AroundContentTypeId;
  imageSrc: string;
  altText: string;
};

export interface PolyBase {
  id: string;
  path: {
    lat: number;
    lng: number;
  }[];
  color: string;
  stock: number;
  zIndex: number;
}

export interface PedestrianPolyFeature extends PolyBase {
  totalTime?: number;
  totalDistance?: number;
}

export interface CarPolyFeature extends PolyBase {
  totalTime?: number;
  totalDistance?: number;
  taxiFare?: number;
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
