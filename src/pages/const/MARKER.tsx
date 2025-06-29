import { touristContentSVG } from '@/assets';

export const markerList = [
  {
    contentTypeId: '12',
    imageSrc: touristContentSVG.TravelPin,
    altText: '관광지',
  },
  {
    contentTypeId: '14',
    imageSrc: touristContentSVG.CulturePin,
    altText: '문화시설',
  },
  {
    contentTypeId: '15',
    imageSrc: touristContentSVG.FestivalPin,
    altText: '행사/공연/축제',
  },
  {
    contentTypeId: '25',
    imageSrc: touristContentSVG.CoursePin,
    altText: '여행 코스',
  },
  {
    contentTypeId: '28',
    imageSrc: touristContentSVG.SportPin,
    altText: '레포츠',
  },
  {
    contentTypeId: '32',
    imageSrc: touristContentSVG.HotelPin,
    altText: '숙박',
  },
  {
    contentTypeId: '38',
    imageSrc: touristContentSVG.ShoppingPin,
    altText: '쇼핑',
  },
  {
    contentTypeId: '39',
    imageSrc: touristContentSVG.RestaurantPin,
    altText: '음식점',
  },
] as const;

export const markerImageMap = {
  '': '/none.png', // 없음
  '12': touristContentSVG.TravelPin,
  '14': touristContentSVG.CulturePin,
  '15': touristContentSVG.FestivalPin,
  '25': touristContentSVG.CoursePin,
  '28': touristContentSVG.SportPin,
  '32': touristContentSVG.HotelPin,
  '38': touristContentSVG.ShoppingPin,
  '39': touristContentSVG.RestaurantPin,
} as const;

export const TOUR_TYPE = {
  '': '없음',
  12: '관광지',
  14: '문화시설',
  15: '행사/공연/축제',
  25: '여행코스',
  28: '레포츠',
  32: '숙박',
  38: '쇼핑',
  39: '음식점',
};
