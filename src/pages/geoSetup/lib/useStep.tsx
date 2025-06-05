import { useState } from 'react';

type UseStepProps = { initialStep?: number; maxStep: number };

export default function useStep({ initialStep = 0, maxStep }: UseStepProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const hasNextStep = currentStep < maxStep;
  const hasPrevStep = currentStep > 0;

  function nextStep() {
    if (!hasNextStep) return;
    setCurrentStep(prev => prev + 1);
  }
  function prevStep() {
    if (!hasPrevStep) return;
    setCurrentStep(prev => (prev > 0 ? prev - 1 : 0));
  }

  return { currentStep, nextStep, prevStep, hasNextStep, hasPrevStep };
}
