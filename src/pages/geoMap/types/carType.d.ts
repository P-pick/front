export type TollgateFareOption =
  | 1 //유/무료
  | 2 //최적 요금
  | 8 //무료 우선
  | 16; // 로직판단(기본값)
export type RoadType =
  | 32 //가까운 도로(기본값)
  | 16 //일반도로
  | 8 //지하도
  | 4 //고가도
  | 2 //도시 고속도로
  | 1 //고속도로
  | 0; //미선택
export type DataDirectionOption =
  | 0 // 주행 방향 비우선(기본값)
  | 1; // 주행 방향 우선
export type CoordType =
  | 'WGS84GEO' // WGS84 좌표계 (기본값)
  | 'EPSG3857' // Google Maps 좌표계
  | 'KATECH'; // TM128(Transverse Mercator: 횡메카토르): 한국 표준 좌표계
export type UncetaintyA =
  | 1 //측위 불량
  | 2 //2차원 측위
  | 3; //3차원 측위
export type CarType =
  | 0 //미선택(기본값)
  | 1 //승용차
  | 2 //중형승합차
  | 3 //대형승합차
  | 4 //대형화물차
  | 5 //특수화물차
  | 6 //경차
  | 7; //이륜차
export type SearchOption =
  | 0 //교통최적 + 추천(기본값)
  | 1 //교통최적 + 무료우선
  | 2 // 교통최적 + 최소시간
  | 3 //교통최적 + 초보
  | 4 //교통최적 + 고속도로우선
  | 10 //최단거리 + 유/무료
  | 12 //이륜차도로우선 (일반도로가 없을 경우 자동차 전용도로로 안내할 수 있음)
  | 19; //교통최적 + 어린이보호구역 회피
export type DetailPosFlag =
  | 0 //고객의 상세 위치를 확인 안하는 경우
  | 1 // 고객의 상세 위치를 확인하는 경우
  | 2; // 상세 위치를 확인 안하는 서비스인 경우(기본값)
export type TotalValue =
  | 1 // 자동차 경로 안내 API의 전체 응답 데이터를 받을 경우
  | 2; // totalDistance, totalTime, totalFare, taxiFare
type TrafficType =
  | 0 // 정보없음
  | 1 //원활
  | 2 // 서행
  | 3 // 지체
  | 4; //정체

export type Traffic = [TrafficType, TrafficType, TrafficType, TrafficType];

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
export type PointType =
  | 'S' //출발지
  | 'E' //목적지
  | 'B1' //경유지1
  | 'B2' //경유지2
  | 'B3' //경유지3
  | 'N'; //일반 안내점
export type CarRequestBody = {
  tollgateFareOption?: TollgateFareOption;
  roadType?: RoadType;
  directionOption?: DataDirectionOption;
  endX: number; // 목적지 경도
  endY: number; // 목적지 위도
  endPoild: string; // 목적지의
  endRpFlag?: string;
  reqCoordType?: CoordType; // 요청 좌표계, 기본값: "WGS84GEO"
  startX: number; // 출발지 경도
  startY: number; // 출발지 위도
  gpsTime?: string; // GPS 시간 (YYYYMMDDhhmmss)
  angle?: number; // 각도 (0~359)
  speed?: number; // 진행 속도 Km/h, 기본값: 10
  uncetaintyA?: UncetaintyA;
  carType?: CarType;
  startName: string;
  endName: string;
  searchOption: SearchOption;
  passList?: string; //경유지들의 X, Y좌표를 콤마와, _ 로 구분하여 순서대로 나열
  gpsInfoList?: string; // GPS 궤적 정보 목록
  detailPosFlag?: DetailPosFlag;
  resCoordType?: CoordType; // 응답 좌표계, 기본값: "WGS84GEO"
  sort?: 'index' | 'distance'; // 정렬 옵션, 기본값: "index"
  totalValue: TotalValue; // 전체 응답 데이터 옵션
  trafficInfo?: 'Y' | 'N'; // 교통 정보 포함 여부
  mainRoadInfo?: 'Y' | 'N'; // 주요 도로 정보
};

export type PointProperties = {
  totalDistance?: number;
  totalTime?: number;
  totalFare?: number;
  taxiFare?: number;
  index: number;
  pointIndex: number;
  name: string;
  description: string;
  nextRoadName: string;
  turnType: TurnType;
  pointType: PointType;
};

export type LineStringProperties = {
  index: number;
  lineIndex: number;
  name: string;
  description: string;
  distance: number;
  time: number;
  roadType: RoadType;
  facilityType: string; // 시설물 종류 예: "교량"
};

export type PointGeometry = {
  type: 'Point';
  coordinates: [number, number];
  traffic: Traffic;
};

export type LineStringGeometry = {
  type: 'LineString';
  coordinates: [number, number][];
  traffic: Traffic[];
};

export type CarFeatures = {
  type: 'Feature';
  geometry: PointGeometry | LineStringGeometry;
  properties: PointProperties | LineStringProperties;
};

export type CarResponse = {
  type: 'FeatureCollection';
  features: CarFeatures[];
};
