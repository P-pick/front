// FocusElements.tsx
import { useLayoutEffect, useState } from 'react';

import { commonSVG } from '@/assets';
import { useLocalStorage } from '@/shared';

import type { TutorialStep } from '../type';

interface FocusElementsProps extends Omit<TutorialStep, 'name'> {
  onStep: (stepId: string) => void;
}

export default function FocusElements({
  id,
  onStep,
  prevStepId,
  nextStepId,
  description,
}: FocusElementsProps) {
  const [isTutorial, setTutorial] = useLocalStorage('isTutorial', true);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    const el = document.getElementById(id);
    if (el) {
      el.style.setProperty('fill', 'white');
      setRect(el.getBoundingClientRect());
    }
  }, [id]);

  const handlePrevious = () => {
    if (prevStepId) onStep(prevStepId);
  };
  const handleNext = () => {
    if (nextStepId) onStep(nextStepId);
  };

  const clipPath = rect
    ? {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        top: `${rect.top}px`,
        left: `${rect.left}px`,
      }
    : undefined;

  return (
    <>
      {/* 포커스 영역 */}
      <div
        className="fixed mix-blend-hard-light inset-0 bg-white/50 pointer-events-none z-(--z-layer2000) rounded-lg"
        style={clipPath}
      />
      {/* 아래 방향 화살표 */}
      {isTutorial && id === 'shortform-slide-tutorial' && (
        <div
          id="shortform-slide-tutorial"
          className="fill-white fixed left-1/2 top-3/5 transform -translate-x-1/2 -translate-y-1/2 z-(--z-layer2000) animate-bounce"
        >
          <commonSVG.DownArrowIcon />
        </div>
      )}
      <div className="fixed top-[10%] max-w-[300px] left-1/2 -translate-x-1/2 bg-white text-black p-4 rounded-lg shadow-lg z-(--z-layer2000)">
        <p>{description}</p>
        <div className="flex justify-between mt-3">
          <button
            onClick={() => setTutorial(false)}
            className="px-3 py-1 bg-(--color-secondary) text-white rounded"
          >
            종료
          </button>
          <div className="flex">
            {prevStepId && (
              <button
                onClick={handlePrevious}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                이전
              </button>
            )}
            {nextStepId && (
              <button
                onClick={handleNext}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
