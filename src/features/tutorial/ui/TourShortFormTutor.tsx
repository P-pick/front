import { useLocalStorage, useFunnel, Portal } from '@/shared';
import { SHORTFORM_TUTORIAL_STEP, FocusElements } from '@/features/tutorial';

export default function TourShortFormTutor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTutorial, _] = useLocalStorage('isTutorial', true);
  const { Funnel, setStep } = useFunnel('shortform-slide-tutorial');

  if (!isTutorial) {
    return <></>;
  }

  return (
    <div className="absolute z-(--z-layer1000) left-0 bottom-0 w-full h-full bg-gray-700/50 flex flex-col items-center justify-center">
      <div className="relative w-full h-full text-white">
        <Portal containerId="tutorial-root">
          <Funnel>
            {SHORTFORM_TUTORIAL_STEP.map(step => (
              <Funnel.Step key={step.id} name={step.name}>
                <FocusElements
                  id={step.id}
                  onStep={setStep}
                  prevStepId={step.prevStepId}
                  nextStepId={step.nextStepId}
                  description={step.description}
                />
              </Funnel.Step>
            ))}
          </Funnel>
        </Portal>
      </div>
    </div>
  );
}
