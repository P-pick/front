import type { FollowBase, TurnType } from './common';

export type PedestrianOptionNames =
  | '추천'
  | '추천 + 대로우선'
  | '최단거리'
  | '최단거리 + 계단제외';
export type SearchOptions =
  | 0 // 추천 경로 (기본값)
  | 4 // 추천 + 대로우선
  | 10 // 최단
  | 30; // 최단거리 + 계단제외
export type CoordType =
  | 'EPSG3857' //Google Maps 좌표계
  | 'WGS84GEO' // WGS84 좌표계 (기본값) - 경위도
  | 'KATECH'; // TM128(Transverse Mercator: 횡메카토르): 한국 표준 좌표계
export type SortType =
  | 'index' // 인덱스 순서 (기본값)
  | 'custom'; // 라인노드, 포인트노드 순서로 정렬

export type FacilityType =
  | 1 //교량
  | 2 //터널
  | 3 // 고가도로
  | 11 //일반보행자도로
  | 12 //육교
  | 14 //지하보도
  | 15 //횡단보도
  | 16 //대형시설물이동통로
  | 18; //지하철지하보도

export type PointType =
  | 'SP' //출발지
  | 'EP' //목적지
  | 'PP' //경유지
  | 'PP1' //경유지1
  | 'PP2' //경유지2
  | 'PP3' //경유지3
  | 'PP4' //경유지4
  | 'PP5' //경유지5
  | 'GP'; // 일반안내점
export type RoadType =
  | 21 //보행자도로1 (차도와 인도가 분리되어 있으며, 정해진 횡단구역으로만 횡단 가능한 보행자 도로)
  | 22 //보행자도로2 (차도와 인도가 분리되어 있지 않거나, 보행자 횡단에 제약이 없는 보행자 도로)
  | 23 //보행자도로3 (차량 통행이 불가능한 보행자 도로)
  | 24; //보행자도로4 (쾌적하지 않은 도로)
export type CategoryRoadType =
  | 0 //미분류
  | 1 // 특화거리
  | 2 // 테마거리
  | 3; //청소년출입금지

export type PedestrianRequestBody = {
  startX: number; // 출발지 경도
  startY: number; // 출발지 위도
  angle?: number; // 각도 (0~359), 기본값: 20
  speed?: number; // 진행속도 Km/h, 기본값: 30
  endPoiId?: string; // 목적지 POI ID, 기본값: '10001'
  endX: number; // 목적지 경도
  endY: number; // 목적지 위도
  passList?: string; // 경유지 목록, 예: "126.92774822,37.55395475_126.92577620,37.55337145"
  reqCoordType?: CoordType; // 요청 좌표계, 기본값: "WGS84GEO"
  startName: string; // 출발지 명칭 (URL 인코딩된 UTF-8 문자열)
  endName: string; // 목적지 명칭 (URL 인코딩된 UTF-8 문자열)
  searchOption?: SearchOptions; // 경로 탐색 옵션, 기본값: "0"
  resCoordType?: CoordType; // 응답 좌표계, 기본값: "WGS84GEO"
  sort?: SortType; // 정렬 옵션, 기본값: "index"
};

export type PointProperties = {
  totalDistance: number; // 총 거리
  totalTime: number; // 총 시간
  index: number; // 경로 순번
  pointIndex: number; // 아이콘 노드
  name: string; //안내 지점 명칭
  description: string; //길 안내 정보 예: "소공로 을 따라 소공로 방면으로 310m 이동"
  direction: string; // 방향 명 예: "온평포구"
  nearPoiName: string; // 안내 지점 주변 관심장소(POI) 명칭 예: "표선해수욕장"
  nearPoiX: number; // 안내 지점 주변 관심장소(POI) 경도
  nearPoiY: number; // 안내 지점 주변 관심장소(POI) 위도
  intersectionName: string; //교차로 명칭
  facilityType: FacilityType; //시설물 종류 예: "횡단보도"
  facilityName: string; //시설물 명칭 예: "교량"
  turnType: TurnType; //회전 정보
  pointType: PointType;
};

export type LineStringProperties = {
  index: number;
  lineIndex: number; // 경로 순번
  name: string;
  description: string;
  distance: number;
  time: number;
  roadType: RoadType;
  categoryRoadType: CategoryRoadType;
  facilityType: FacilityType; // 시설물 종류 예: "교량"
  facilityName: string; // 시설물 명칭 예: "교량"
};

export type PointGeometry = {
  type: 'Point';
  coordinates: [number, number]; // [경도, 위도]
};

export type LineStringGeometry = {
  type: 'LineString';
  coordinates: [number, number][]; // [[경도, 위도], ...]
};

export type PedestrianFeatures = {
  type: 'Feature';
  geometry: PointGeometry | LineStringGeometry;
  properties: PointProperties | LineStringProperties;
};

export type PedestrianResponse = {
  type: 'FeatureCollection';
  features: PedestrianFeatures[];
};

export interface PedestrianFollowFeature extends FollowBase {
  totalTime?: number;
  totalDistance?: number;
  turnType: TurnType;
  facilityType?: FacilityType;
}

export type PedestrianMultiplePathResponse = {
  optionId: SearchOptions;
  name: PedestrianOptionNames;
  features: PedestrianFeatures[];
};
