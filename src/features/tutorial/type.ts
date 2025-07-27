export type TutorialStepBase = {
  id: string;
  description: string;
};

export interface TutorialStep extends TutorialStepBase {
  prevStepId: string;
  nextStepId: string;
}
