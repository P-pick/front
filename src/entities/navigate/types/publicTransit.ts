export type TransitRequestBody = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  lang?: 0 | 1; // 언어선택 0: 국문(기본값), 1: 영문
  format?: string; // 출력포맷 (json, xml)
  count?: number; //최대 응답 결과 개수 1 ~ 10 , 기본값 10
  searchDttm?: string; //타이머신 기능 검색 날짜 (yyyymmmdedhhmi) 예) 202
};

// 좌표 정보
type Coordinate = {
  lon: number;
  lat: number;
};

// 통화 정보
type Currency = {
  symbol: string;
  currency: string;
  currencyCode: string;
};

// 요금 정보
type Fare = {
  regular: {
    totalFare: number;
    currency: Currency;
  };
};

// 정류장(역/버스정류장) 정보
type Station = {
  index: number;
  stationName: string;
  stationID?: string; // subway만 있음
} & Coordinate;

// 통과 경로 정보 (LineString)
type PassShape = {
  linestring: string;
};

// 도보 상세 경로
type WalkStep = {
  streetName: string;
  distance: number;
  description: string;
  linestring: string;
};

// 도보/지하철/버스 공통 구간
type LegBase = {
  mode: 'WALK' | 'SUBWAY' | 'BUS';
  sectionTime: number;
  distance: number;
  start: {
    name: string;
  } & Coordinate;
  end: {
    name: string;
  } & Coordinate;
};

// 도보 구간
export type WalkLeg = LegBase & {
  mode: 'WALK';
  steps?: WalkStep[];
};

// 지하철 구간
export type SubwayLeg = LegBase & {
  mode: 'SUBWAY';
  routeColor: string;
  route: string;
  routeId: string;
  service: number;
  passStopList: {
    stationList: Station[];
  };
  type: number;
  passShape?: PassShape;
};

// 버스 구간
export type BusLeg = LegBase & {
  mode: 'BUS';
  routeColor: string;
  route: string;
  routeId: string;
  service: number;
  type: number;
  passStopList: {
    stationList: Station[];
  };
  passShape?: PassShape;
};

// 기차 노선 정보
type TrainLane = {
  routeColor: string;
  route: string;
  routeId: string;
  service: number;
  type: number;
};

// 기차 구간
export type TrainLeg = Omit<LegBase, 'mode'> & {
  mode: 'TRAIN';
  routeColor: string;
  distance: number;
  route: string;
  routeId: string;
  service: number;
  type: number;
  Lane: TrainLane[];
  passStopList: {
    stationList: Station[];
  };
  passShape?: PassShape;
  routePayment: number;
};

export type TransitLeg = WalkLeg | SubwayLeg | BusLeg | TrainLeg;

// 하나의 이동 경로
export type Itinerary = {
  fare: Fare;
  totalTime: number;
  totalWalkTime: number;
  transferCount: number;
  totalDistance: number;
  pathType: number;
  totalWalkDistance: number;
  legs: Array<TransitLeg>;
};

// 전체 계획
type TransitPlan = {
  itineraries: Itinerary[];
};

// 요청 파라미터 정보
export type RequestParameters = {
  busCount: number;
  expressbusCount: number;
  subwayCount: number;
  airplaneCount: number;
  locale: string;
  endY: string;
  endX: string;
  wideareaRouteCount: number;
  subwayBusCount: number;
  startY: string;
  startX: string;
  ferryCount: number;
  trainCount: number;
  reqDttm: string;
};

// 최상위 응답 타입
export type TransitPlanResponse = {
  metaData: {
    requestParameters: RequestParameters;
    plan: TransitPlan;
  };
};
