import { createTutorialStep } from './lib';

export const SHORTFORM_TUTORIAL_STEP = createTutorialStep([
  {
    id: 'shortform-slide-tutorial',
    description: '아래로 슬라이드해 새로운 관광지 정보를 불러올 수 있습니다.',
  },
  {
    id: 'tour-detail-tutorial',
    description: '관광지 상세 정보를 확인할 수 있습니다.',
  },
  {
    id: 'tour-map-tutorial',
    description: '관광지 위치와 그 주변 관광지를 지도에서 확인할 수 있습니다.',
  },
  {
    id: 'tour-start-tutorial',
    description:
      '여행 시작하기 버튼을 통해서 관광지까지의 길찾기를 진행할 수 있습니다.',
  },
  {
    id: 'tour-setting-tutorial',
    description:
      '여행 설정을 통해서 불러오는 관광지 정보를 필더링 할 수 있습니다.',
  },
  {
    id: 'home-navigation-tutorial',
    description: '숏폼으로 여행을 탐색할 수 있습니다.',
  },
  {
    id: 'list-navigation-tutorial',
    description: '관광지를 리스트 형태로 확인할 수 있습니다.',
  },
  {
    id: 'bookmark-navigation-tutorial',
    description:
      '내가 지정한 관심 관광지 리스트를 확인 가능합니다.(회원 전용 기능)',
  },
  {
    id: 'profile-navigation-tutorial',
    description:
      '내 프로필을 확인하고 설정할 수 있는 탭이 나옵니다.(회원 전용 기능)',
  },
]);
