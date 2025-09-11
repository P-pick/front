import { commonSVG } from '@/assets';

import {
  SHORTFORM_TUTORIAL_STEP,
  FocusElements,
  TutorialFocusStep,
  useLayoutRect,
} from '@/features/tutorial';
import { useLocalStorage, useFunnel, Portal } from '@/shared';

export default function TourShortFormTutor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTutorial, _] = useLocalStorage('isTutorial', true);
  const { Funnel, setStep, currentStep } = useFunnel(
    'shortform-slide-tutorial',
  );
  const rect = useLayoutRect(currentStep ?? 'shortform-slide-tutorial');

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
                <FocusElements rect={rect} />
                <TutorialFocusStep
                  description={step.description}
                  prevStepId={step.prevStepId}
                  nextStepId={step.nextStepId}
                  onStep={setStep}
                  isEnd={!step.nextStepId}
                />
                {currentStep === 'shortform-slide-tutorial' && (
                  // 아래로 향하는 화살표 아이콘
                  <div className="fixed top-3/5 left-1/2 -translate-x-1/2 z-(--z-layer1000)">
                    <commonSVG.DownArrowIcon
                      id="shortform-slide-tutorial"
                      className=" animate-bounce fill-white"
                    />
                  </div>
                )}
              </Portal>
            </Funnel.Step>
          ))}
        </Funnel>
      </div>
    </div>
  );
}
