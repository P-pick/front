import type { TutorialStep, TutorialStepBase } from '@/features/tutorial';

export const createTutorialStep = (
  stepList: TutorialStepBase[],
): TutorialStep[] => {
  return stepList.map((step, index) => {
    const prevStepId = index > 0 ? stepList[index - 1].id : '';
    const nextStepId =
      index < stepList.length - 1 ? stepList[index + 1].id : '';
    return {
      ...step,
      prevStepId,
      nextStepId,
    };
  });
};
