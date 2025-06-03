type CoordType = 'EPSG3857' | 'WGS84GEO' | 'KATECH';

type SearchOption = '0' | '4' | '10' | '30';

type SortType = 'index' | 'custom';

type PedestrianRequestHeaders = {
  appKey: string; //  API 키
};

type PedestrianRequestParams = {
  version?: string; // API 버전, 기본값: "1"
  callback?: string; // 콜백 함수 이름
};

type PedestrianRequestBody = {
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
  searchOption?: SearchOption; // 경로 탐색 옵션, 기본값: "0"
  resCoordType?: CoordType; // 응답 좌표계, 기본값: "WGS84GEO"
  sort?: SortType; // 정렬 옵션, 기본값: "index"
};

type PedestrianGeometry =
  | {
      type: 'Point';
      coordinates: [number, number];
    }
  | {
      type: 'LineString';
      coordinates: [number, number][];
    };

interface PedestrianNavigationProperties {
  // 공통
  index?: number;
  name?: string;
  description?: string;

  // 출발/도착/경유지 안내
  pointType?: 'SP' | 'EP' | 'PP' | 'PP1' | 'PP2' | 'PP3' | 'PP4' | 'PP5' | 'GP';
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

export interface PedestrianFeature {
  type: 'Feature';
  geometry: PedestrianGeometry;
  properties: PedestrianNavigationProperties;
}

export interface PedestrianResponse {
  type: 'FeatureCollection';
  features: PedestrianFeature[];
}

export type TMapPedestrianRequest = {
  body: PedestrianRequestBody;
  headers: PedestrianRequestHeaders;
  params: PedestrianRequestParams;
};
