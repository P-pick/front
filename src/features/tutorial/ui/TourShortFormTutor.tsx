import { useLocalStorage, useFunnel, Portal } from '@/shared';
import {
  SHORTFORM_TUTORIAL_STEP,
  FocusElements,
  TutorialFocusStep,
} from '@/features/tutorial';

export default function TourShortFormTutor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTutorial, _] = useLocalStorage('isTutorial', true);
  const { Funnel, setStep } = useFunnel('shortform-slide-tutorial');

  if (!isTutorial) {
    return <></>;
  }

  return (
    <div className="fixed z-(--z-layer1000) left-0 bottom-0 w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full h-full text-white">
        <Funnel>
          {SHORTFORM_TUTORIAL_STEP.map(step => (
            <Funnel.Step name={step.id} key={step.id}>
              <Portal containerId="tutorial-root">
                <FocusElements id={step.id} />
                <TutorialFocusStep
                  description={step.description}
                  prevStepId={step.prevStepId}
                  nextStepId={step.nextStepId}
                  onStep={setStep}
                />
              </Portal>
            </Funnel.Step>
          ))}
        </Funnel>
      </div>
    </div>
  );
}
