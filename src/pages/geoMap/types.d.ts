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
type CoordType = 'EPSG3857' | 'WGS84GEO' | 'KATECH';
type SearchOption = 0 | 4 | 10 | 30;
type SortType = 'index' | 'custom';
type TollgateFareOptionType = 1 | 2 | 8 | 16;
type RoadType = 0 | 1 | 2 | 4 | 8 | 16 | 32;
type dataDirectionOption = 0 | 1;
type CarType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type CarSearchOption = 0 | 1 | 2 | 3 | 4 | 10 | 12 | 19;
type DetailPosFlag = 0 | 1 | 2;
type TransportationType =
  | 'pedestrian'
  | 'car'
  | 'bicycle'
  | 'public-transportation';
type PedestrianPointType =
  | 'SP' //출발지
  | 'EP' //도착지
  | 'PP' //경유지
  | 'PP1' //경유지1
  | 'PP2' //경유지2
  | 'PP3' //경유지3
  | 'PP4' //경유지4
  | 'PP5' //경유지5
  | 'GP'; // 일반안내점
type CarPointType = 'S' | 'E' | 'B1' | 'B2' | 'B3' | 'N';

export type MarkerType = {
  contentTypeId: AroundContentTypeId;
  imageSrc: string;
  altText: string;
};

type PedestrianRequestBody = {
  startX: number | null; // 출발지 경도
  startY: number | null; // 출발지 위도
  angle?: number; // 각도 (0~359), 기본값: 20
  speed?: number; // 진행속도 Km/h, 기본값: 30
  endPoiId?: string; // 목적지 POI ID, 기본값: '10001'
  endX: number | null; // 목적지 경도
  endY: number | null; // 목적지 위도
  passList?: string; // 경유지 목록, 예: "126.92774822,37.55395475_126.92577620,37.55337145"
  reqCoordType?: CoordType; // 요청 좌표계, 기본값: "WGS84GEO"
  startName: string; // 출발지 명칭 (URL 인코딩된 UTF-8 문자열)
  endName: string; // 목적지 명칭 (URL 인코딩된 UTF-8 문자열)
  searchOption?: SearchOption; // 경로 탐색 옵션, 기본값: "0"
  resCoordType?: CoordType; // 응답 좌표계, 기본값: "WGS84GEO"
  sort?: SortType; // 정렬 옵션, 기본값: "index"
};

type CarRequestBody = {
  tollgateFareOption?: TollgateFareOptionType;
  roadType?: RoadType;
  directionOption?: dataDirectionOption;
  endX: number;
  endY: number;
  endRpFlag?: string;
  reqCoordType?: CoordType;
  startX: number;
  startY: number;
  gpsTime?: string;
  speed?: number;
  uncetaintyP?: number;
  uncetaintyA?: number;
  uncetaintyAP?: number;
  carType?: CarType;
  startName?: string;
  endName?: string;
  passList?: string;
  gpsInfoList?: string;
  detailPosFlag?: string;
  resCoordType?: string;
  sort?: SortType;
  totalValue?: number;
  trafficInfo?: 'Y' | 'N';
  mainRoadInfo?: string;
};

type Traffic = number[]; // [시작 index, 마지막 index, 혼잡도, 속도]
type Geometry =
  | {
      type: 'Point';
      coordinates: [number, number];
      traffic?: Traffic[];
    }
  | {
      type: 'LineString';
      coordinates: [number, number][];
      traffic?: Traffic[];
    };

interface PedestrianNavigationProperties {
  // 공통
  index?: number;
  name?: string;
  description?: string;

  // 출발/도착/경유지 안내
  pointType?: PedestrianPointType;
  direction?: string;
  nearPoiName?: string;
  nearPoiX?: string;
  nearPoiY?: string;
  intersectionName?: string;
  turnType?: number;
  pointIndex?: number;

  // 거리/시간 정보 (출발지에서만 제공)
  totalDistance?: number; // 단위: m
  totalTime?: number; // 단위: 초

  // 도로 및 시설물 정보
  lineIndex?: number;
  distance?: number; // 단위: m
  time?: number; // 단위: 초
  roadType?: 21 | 22 | 23 | 24;
  categoryRoadType?: 0 | 1 | 2 | 3;
  facilityType?: 1 | 2 | 3 | 11 | 12 | 14 | 15 | 16 | 17 | 18 | 127 | 128 | 129;
  facilityName?: string;
}

export type CarPropertiesSPType = {
  totalDistance: number;
  totalTime: number;
  taxiFare: number;
  index: number;
  pointIndex: number;
  name: string;
  description: string;
  direction: string;
  nearPoiName: string;
  nearPoiX: string;
  nearPoiY: string;
  intersectionName: string;
  facilityType: string;
  facilityName: string;
  turnType: number;
  pointType: CarPointType;
};

// 길 안내 사용자 정의 프로퍼티
type GuideProperties = {
  totalDistance?: string; // 예: "3000"
  totalTime?: number; // 예: 600
  totalFare?: string; // 예: "1500"
  taxiFare?: number; // 예: 363000
  index?: string;
  pointIndex?: number;
  name?: string;
  description?: string;
  nextRoadName?: string;
  turnType?: number;
  pointType?: CarPointType;
};

// 도로 및 시설물 정보 사용자 정의 프로퍼티
type RoadProperties = {
  index?: string;
  lineIndex?: number;
  name?: string;
  description?: string;
  distance?: number;
  time?: number;
  roadType?: number;
  facilityType?: number;
};

export interface PedestrianFeature {
  type: 'Feature';
  geometry: Geometry;
  properties: PedestrianNavigationProperties;
}

export interface CarPathFeature {
  type: 'Feature';
  geometry: Geometry;
  properties: GuideProperties | RoadProperties | CarPropertiesSPType;
}

interface TMapBaseResponse {
  type: 'FeatureCollection';
}

export interface PedestrianResponse extends TMapBaseResponse {
  features: PedestrianFeature[];
}

export interface CarResponse extends TMapBaseResponse {
  features: CarPathFeature[];
}
