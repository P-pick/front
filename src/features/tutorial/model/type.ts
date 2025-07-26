export interface TutorialStep {
  name: string; // useFunnel에서 사용할 각 스텝의 이름
  targetQuerySelector: string; // 포커싱할 요소의 CSS 선택자
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // 설명 박스 위치
}
