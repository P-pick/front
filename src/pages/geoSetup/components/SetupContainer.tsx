import { STEP } from '../const';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStep } from '../lib';
import { SetupButtonList, FooterButton, SetupHeader } from './';

export default function SetupContainer() {
  const {
    currentStep: currentStepNum,
    nextStep,
    prevStep,
    hasNextStep,
    hasPrevStep,
  } = useStep({
    maxStep: STEP.length - 1,
  });

  const currentStep = STEP[currentStepNum];
  const [currentValue, setCurrentValue] = useState<string>(
    STEP[0].stepList[0].value
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    searchParams.set(currentStep.name, currentValue);
    setSearchParams(searchParams, { replace: true });
  }, [currentValue]);

  const handleButtonClick = useCallback(
    (value: string) => {
      setCurrentValue(value);
    },
    [currentStep]
  );

  const handleNext = useCallback(() => {
    if (hasNextStep) {
      nextStep();
    } else {
      navigate({
        pathname: '/geo-trip',
        search: searchParams.toString(),
      });
    }
  }, [hasNextStep]);

  return (
    <div className="flex flex-col h-full">
      <header className="flex flex-col">
        <SetupHeader
          hasPrevStep={hasPrevStep}
          prevStep={prevStep}
          currentStep={currentStepNum + 1}
          maxStep={STEP.length}
          title={currentStep.title}
        />
      </header>
      <main className="flex flex-col gap-y-5">
        <SetupButtonList
          steps={[...currentStep.stepList]}
          selectedValue={searchParams.get(currentStep.name) || ''}
          onSelect={handleButtonClick}
        />
      </main>
      <footer className="h-full flex flex-col justify-end pb-[24px]">
        <FooterButton
          onClick={handleNext}
          text={hasNextStep ? '다음' : '탐색'}
        />
      </footer>
    </div>
  );
}
