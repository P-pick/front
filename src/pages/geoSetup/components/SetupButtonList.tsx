import type { Step } from '../types';
import { SetupButton } from './';

interface SetupButtonListProps {
  steps: Step[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function SetupButtonList({
  steps,
  selectedValue,
  onSelect,
}: SetupButtonListProps) {
  return (
    <>
      {steps.map(step => (
        <SetupButton
          key={step.id}
          label={step.label}
          value={step.value}
          checked={selectedValue === step.value}
          onClick={() => onSelect(step.value)}
        />
      ))}
    </>
  );
}
