import { useLocalStorage, useFunnel, Portal } from '@/shared';
import { SHORTFORM_TUTORIAL_STEP, FocusElements } from '@/features/tutorial';

export default function TourShortFormTutor() {
  const [isTutorial, setTutorial] = useLocalStorage('isTutorial', true);
  const { Funnel, setStep } = useFunnel('shortform-slide-tutorial');

  if (!isTutorial) {
    return <></>;
  }

  return (
    <div className="absolute z-(--z-layer1000) left-0 bottom-0 w-full h-full bg-gray-700/50 flex flex-col items-center justify-center">
      <div className="relative w-full h-full text-white">
        <div className="absolute top-5 left-0 right-0 flex justify-center items-center px-5">
          <button
            onClick={() => setTutorial(false)}
            className="bg-white text-black py-1 px-3 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200"
          >
            튜토리얼 종료
          </button>
        </div>
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
