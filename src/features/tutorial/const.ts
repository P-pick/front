import type { TutorialStep } from './type';

export const SHORTFORM_TUTORIAL_STEP: TutorialStep[] = [
  {
    id: 'shortform-slide-tutorial',
    name: 'shortform-slide-tutorial',
    description: '아래로 슬라이드해 새로운 관광지 정보를 불러올 수 있습니다.',
    prevStepId: '',
    nextStepId: 'tour-detail-tutorial',
  },
  {
    id: 'tour-detail-tutorial',
    name: 'tour-detail-tutorial',
    description: '관광지 상세 정보를 확인할 수 있습니다.',
    prevStepId: 'shortform-slide-tutorial',
    nextStepId: 'tour-map-tutorial',
  },
  {
    id: 'tour-map-tutorial',
    name: 'tour-map-tutorial',
    description: '관광지 위치와 그 주변 관광지를 지도에서 확인할 수 있습니다.',
    prevStepId: 'tour-detail-tutorial',
    nextStepId: 'start-tour',
  },
  {
    id: 'start-tour',
    name: 'start-tour',
    description:
      '여행 시작하기 버튼을 통해서 관광지까지의 길찾기를 진행할 수 있습니다.',
    prevStepId: 'tour-map-tutorial',
    nextStepId: 'setting-tour',
  },
  {
    id: 'setting-tour',
    name: 'setting-tour',
    description:
      '여행 설정을 통해서 불러오는 관광지 정보를 필더링 할 수 있습니다.',
    prevStepId: 'start-tour',
    nextStepId: '',
  },
];
