/**
 * @description 공통 속성을 정의하는 기본 인터페이스
 */
export interface BaseInfo {
  infocenter?: string; // 문의 및 안내
  parking?: string; // 주차시설
  restdate?: string; // 쉬는날
  scale?: string; // 규모
  usetime?: string; // 이용시간
}

/**
 * @description 시설 관련 공통 속성을 정의하는 인터페이스
 */
export interface BaseFacilityInfo extends BaseInfo {
  accomcount?: string; // 수용인원
  chkbabycarriage?: string; // 유모차대여정보
  chkcreditcard?: string; // 신용카드가능정보
  chkpet?: string; // 애완동물동반가능정보
}

// type id 12: 관광지
export interface TouristAttraction extends BaseFacilityInfo {
  expagerange?: string; // 체험가능연령
  expguide?: string; // 체험안내
  heritage1?: string; // 세계문화유산유무
  heritage2?: string; // 세계자연유산유무
  heritage3?: string; // 세계기록유산유무
  opendate?: string; // 개장일
  useseason?: string; // 이용시기
}

// type id 14: 문화시설
export interface CultureFacility extends BaseFacilityInfo {
  discountinfo?: string; // 할인정보
  parkingfee?: string; // 주차요금
  usefee?: string; // 이용요금
  spendtime?: string; // 관람소요시간
}

// type id 15: 축제/행사
export interface FestivalEvent {
  agelimit?: string; // 관람가능연령
  bookingplace?: string; // 예매처
  discountinfo?: string; // 할인정보
  eventenddate?: string; // 행사종료일
  eventhomepage?: string; // 행사홈페이지
  eventplace?: string; // 행사장소
  eventstartdate?: string; // 행사시작일
  festivalgrade?: string; // 축제등급
  placeinfo?: string; // 행사장위치안내
  playtime?: string; // 공연시간
  program?: string; // 행사프로그램
  spendtime?: string; // 관람소요시간
  sponsor1?: string; // 주최자정보
  sponsor1tel?: string; // 주최자연락처
  sponsor2?: string; // 주관사정보
  sponsor2tel?: string; // 주관사연락처
  subevent?: string; // 부대행사내용
  usetime?: string; // 이용요금
}

// type id 25: 여행코스
export interface TourCourse {
  distance?: string; // 코스총거리
  infocenter?: string; // 문의 및 안내
  schedule?: string; // 코스일정
  taketime?: string; // 코스총소요시간
  theme?: string; // 코스테마
}

// type id 28: 레포츠
export interface Leports extends BaseFacilityInfo {
  expagerange?: string; // 체험가능연령
  openperiod?: string; // 개장기간
  parkingfee?: string; // 주차요금
  reservation?: string; // 예약안내
  usefee?: string; // 입장료
}

// type id 32: 숙박
export interface Lodging extends BaseInfo {
  accomcount?: string; // 수용가능인원
  checkintime?: string; // 입실시간
  checkouttime?: string; // 퇴실시간
  chkcooking?: string; // 객실내취사여부
  foodplace?: string; // 식음료장
  pickup?: string; // 픽업서비스
  roomcount?: string; // 객실수
  reservation?: string; // 예약안내
  reservationurl?: string; // 예약안내홈페이지
  roomtype?: string; // 객실유형
  subfacility?: string; // 부대시설 (기타)
  barbecue?: string; // 바비큐장여부
  beauty?: string; // 뷰티시설정보
  beverage?: string; // 식음료장여부
  bicycle?: string; // 자전거대여여부
  campfire?: string; // 캠프파이어여부
  fitness?: string; // 휘트니스센터여부
  karaoke?: string; // 노래방여부
  publicbath?: string; // 공용샤워실여부
  publicpc?: string; // 공용 PC실여부
  sauna?: string; // 사우나실여부
  seminar?: string; // 세미나실여부
  sports?: string; // 스포츠시설여부
  refundregulation?: string; // 환불규정
}

// type id 38: 쇼핑
export interface Shopping extends BaseInfo {
  chkbabycarriage?: string; // 유모차대여정보
  chkcreditcard?: string; // 신용카드가능정보
  chkpet?: string; // 애완동물동반가능정보
  culturecenter?: string; // 문화센터바로가기
  fairday?: string; // 장서는날
  opendate?: string; // 개장일
  opentime?: string; // 영업시간
  restroom?: string; // 화장실설명
  saleitem?: string; // 판매품목
  saleitemcost?: string; // 판매품목별가격
  shopguide?: string; // 매장안내
}

// type id 39: 음식점
export interface Food extends BaseInfo {
  chkcreditcard?: string; // 신용카드가능정보
  discountinfo?: string; // 할인정보
  firstmenu?: string; // 대표메뉴
  kidsfacility?: string; // 어린이놀이방여부
  opendate?: string; // 개업일
  opentime?: string; // 영업시간
  packing?: string; // 포장가능
  reservation?: string; // 예약안내
  seat?: string; // 좌석수
  smoking?: string; // 금연/흡연여부
  treatmenu?: string; // 취급메뉴
  lcnsno?: string; // 인허가번호
}

export type DetailIntroResponse =
  | TouristAttraction
  | CultureFacility
  | FestivalEvent
  | TourCourse
  | Leports
  | Lodging
  | Shopping
  | Food;
