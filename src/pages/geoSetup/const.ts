export const STEP = [
  {
    id: 1,
    title: '이동 가능한 거리를\n 선택해주세요.',
    name: 'distance',
    stepList: [
      { id: 1, label: '~ 1KM', value: '1000' },
      { id: 2, label: '~ 5KM', value: '5000' },
      { id: 3, label: '~ 10KM', value: '10000' },
      { id: 4, label: '~ 20KM', value: '20000' },
    ],
  },
  {
    id: 2,
    title: '관광 타입을 선택해주세요.',
    name: 'tour-type',
    stepList: [
      { id: 1, label: '관광지', value: '12' },
      { id: 2, label: '문화시설', value: '14' },
      { id: 3, label: '축제공연행사', value: '15' },
    ],
  },
] as const;
