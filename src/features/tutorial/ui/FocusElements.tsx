// FocusElements.tsx
import { useLocalStorage } from '@/shared';
import { useEffect, useState } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTutorial, setTutorial] = useLocalStorage('isTutorial', true);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const el = document.getElementById(id); // 하이라이트할 대상
    if (el) {
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
    ? `polygon(
        0 0,
        100% 0,
        100% 100%,
        0 100%,
        0 ${rect.top}px,
        ${rect.left}px ${rect.top}px,
        ${rect.left}px ${rect.top + rect.height}px,
        ${rect.left + rect.width}px ${rect.top + rect.height}px,
        ${rect.left + rect.width}px ${rect.top}px,
        0 ${rect.top}px
        z-index: 2000;
      )`
    : undefined;

  return (
    <>
      {/* 하이라이트 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 pointer-events-none transition-all duration-200"
        style={{ clipPath }}
      />
      {/* 설명 및 버튼 UI */}
      <div className="fixed top-[10%] max-w-[300px] left-1/2 -translate-x-1/2 bg-white text-black p-4 rounded-lg shadow-lg z-(--z-layer2000)">
        <p>{description}</p>
        <div className="mt-3 flex justify-end">
          {prevStepId && (
            <button
              onClick={handlePrevious}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              이전
            </button>
          )}
          {nextStepId ? (
            <button
              onClick={handleNext}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              다음
            </button>
          ) : (
            <button
              onClick={() => setTutorial(false)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              종료
            </button>
          )}
        </div>
      </div>
    </>
  );
}
