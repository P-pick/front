const tourist = '/travel.png'; // 12
const culturalFacilities = '/culture.png'; //14
const festival = '/festival2.png'; // 15
const travelCourse = '/course.png'; // 25
const leisureSports = '/sports2.png'; //28
const accommodation = '/hotel.png'; //32
const shopping = '/shopping.png'; //38
const restaurant = '/restaurant2.png'; // 39

export const markerList = [
  {
    contentTypeId: '12',
    imageSrc: tourist,
    altText: '관광지',
  },
  {
    contentTypeId: '14',
    imageSrc: culturalFacilities,
    altText: '문화시설',
  },
  {
    contentTypeId: '15',
    imageSrc: festival,
    altText: '행사/공연/축제',
  },
  {
    contentTypeId: '25',
    imageSrc: travelCourse,
    altText: '여행 코스',
  },
  {
    contentTypeId: '28',
    imageSrc: leisureSports,
    altText: '레포츠',
  },
  {
    contentTypeId: '32',
    imageSrc: accommodation,
    altText: '숙박',
  },
  {
    contentTypeId: '38',
    imageSrc: shopping,
    altText: '쇼핑',
  },
  {
    contentTypeId: '39',
    imageSrc: restaurant,
    altText: '음식점',
  },
] as const;

export const markerImageMap = {
  '': '/none.png', // 없음
  '12': tourist,
  '14': culturalFacilities,
  '15': festival,
  '25': travelCourse,
  '28': leisureSports,
  '32': accommodation,
  '38': shopping,
  '39': restaurant,
} as const;
