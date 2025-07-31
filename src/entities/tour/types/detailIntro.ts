export interface TouristAttraction {
  accomcount?: string; // 수용인원
  chkbabycarriage?: string; // 유모차대여정보
  chkcreditcard?: string; // 신용카드가능정보
  chkpet?: string; // 애완동물동반가능정보
  expagerange?: string; // 체험가능연령
  expguide?: string; // 체험안내
  heritage1?: string; // 세계문화유산유무
  heritage2?: string; // 세계자연유산유무
  heritage3?: string; // 세계기록유산유무
  infocenter?: string; // 문의 및 안내
  opendate?: string; // 개장일
  parking?: string; // 주차시설
  restdate?: string; // 쉬는날
  useseason?: string; // 이용시기
  usetime?: string; // 이용시간
}

export interface CultureFacility {
  accomcountculture?: string; // 수용인원
  chkbabycarriageculture?: string; // 유모차대여정보
  chkcreditcardculture?: string; // 신용카드가능정보
  chkpetculture?: string; // 애완동물동반가능정보
  discountinfo?: string; // 할인정보
  infocenterculture?: string; // 문의 및 안내
  parkingculture?: string; // 주차시설
  parkingfee?: string; // 주차요금
  restdateculture?: string; // 쉬는날
  usefee?: string; // 이용요금
  usetimeculture?: string; // 이용시간
  scale?: string; // 규모
  spendtime?: string; // 관람소요시간
}

export interface FestivalEvent {
  agelimit?: string; // 관람가능연령
  bookingplace?: string; // 예매처
  discountinfofestival?: string; // 할인정보
  eventenddate?: string; // 행사종료일
  eventhomepage?: string; // 행사홈페이지
  eventplace?: string; // 행사장소
  eventstartdate?: string; // 행사시작일
  festivalgrade?: string; // 축제등급
  placeinfo?: string; // 행사장위치안내
  playtime?: string; // 공연시간
  program?: string; // 행사프로그램
  spendtimefestival?: string; // 관람소요시간
  sponsor1?: string; // 주최자정보
  sponsor1tel?: string; // 주최자연락처
  sponsor2?: string; // 주관사정보
  sponsor2tel?: string; // 주관사연락처
  subevent?: string; // 부대행사내용
  usetimefestival?: string; // 이용요금
}

export interface TourCourse {
  distance?: string; // 코스총거리
  infocentertourcourse?: string; // 문의 및 안내
  schedule?: string; // 코스일정
  taketime?: string; // 코스총소요시간
  theme?: string; // 코스테마
}

export interface Leports {
  accomcountleports?: string; // 수용인원
  chkbabycarriageleports?: string; // 유모차대여정보
  chkcreditcardleports?: string; // 신용카드가능정보
  chkpetleports?: string; // 애완동물동반가능정보
  expagerangeleports?: string; // 체험가능연령
  infocenterleports?: string; // 문의 및 안내
  openperiod?: string; // 개장기간
  parkingfeeleports?: string; // 주차요금
  parkingleports?: string; // 주차시설
  reservation?: string; // 예약안내
  restdateleports?: string; // 쉬는날
  scaleleports?: string; // 규모
  usefeeleports?: string; // 입장료
  usetimeleports?: string; // 이용시간
}

export interface Lodging {
  accomcountlodging?: string; // 수용가능인원
  checkintime?: string; // 입실시간
  checkouttime?: string; // 퇴실시간
  chkcooking?: string; // 객실내취사여부
  foodplace?: string; // 식음료장
  infocenterlodging?: string; // 문의 및 안내
  parkinglodging?: string; // 주차시설
  pickup?: string; // 픽업서비스
  roomcount?: string; // 객실수
  reservationlodging?: string; // 예약안내
  reservationurl?: string; // 예약안내홈페이지
  roomtype?: string; // 객실유형
  scalelodging?: string; // 규모
  subfacility?: string; // 부대시설 (기타)

  // 부대시설 여부 정보 (모두 string으로 처리)
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

export interface Shopping {
  chkbabycarriageshopping?: string; // 유모차대여정보
  chkcreditcardshopping?: string; // 신용카드가능정보
  chkpetshopping?: string; // 애완동물동반가능정보
  culturecenter?: string; // 문화센터바로가기
  fairday?: string; // 장서는날
  infocentershopping?: string; // 문의 및 안내
  opendateshopping?: string; // 개장일
  opentime?: string; // 영업시간
  parkingshopping?: string; // 주차시설
  restdateshopping?: string; // 쉬는날
  restroom?: string; // 화장실설명
  saleitem?: string; // 판매품목
  saleitemcost?: string; // 판매품목별가격
  scaleshopping?: string; // 규모
  shopguide?: string; // 매장안내
}

export interface Food {
  chkcreditcardfood?: string; // 신용카드가능정보
  discountinfofood?: string; // 할인정보
  firstmenu?: string; // 대표메뉴
  infocenterfood?: string; // 문의 및 안내
  kidsfacility?: string; // 어린이놀이방여부
  opendatefood?: string; // 개업일
  opentimefood?: string; // 영업시간
  packing?: string; // 포장가능
  parkingfood?: string; // 주차시설
  reservationfood?: string; // 예약안내
  restdatefood?: string; // 쉬는날
  scalefood?: string; // 규모
  seat?: string; // 좌석수
  smoking?: string; // 금연/흡연여부
  treatmenu?: string; // 취급메뉴
  lcnsno?: string; // 인허가번호
}
