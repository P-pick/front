import { useLocalStorage } from '@/shared';

import type { TutorialStep } from '@/features/tutorial';

interface TutorialFocusStepProps
  extends Pick<TutorialStep, 'prevStepId' | 'nextStepId' | 'description'> {
  onStep: (stepId: string) => void;
}

export default function TutorialFocusStep({
  prevStepId,
  nextStepId,
  onStep,
  description,
}: TutorialFocusStepProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setTutorial] = useLocalStorage('isTutorial', true);

  const handlePrevious = () => {
    if (prevStepId) onStep(prevStepId);
  };
  const handleNext = () => {
    if (nextStepId) onStep(nextStepId);
  };

  return (
    <div className="fixed top-25 max-w-[300px] left-1/2 -translate-x-1/2 bg-white text-black p-4 rounded-lg shadow-lg z-(--z-layer2000)">
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
  );
}
