import type { CarFeatures } from './carType';
import type { PedestrianFeatures } from './pedestrianType';

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

export type PolyFeatures = PedestrianFeatures[] | CarFeatures[] | undefined;
