import type { TourSummary } from '../../types';
import { GoToAroundTouristButton, TourListButton } from './';

interface OverlayButtonGroupProps {
  goToAroundTouristButtonProps: TourSummary;
}

export default function OverlayButtonGroup({
  goToAroundTouristButtonProps,
}: OverlayButtonGroupProps) {
  return (
    <div className="absolute bottom-1/2 right-0 z-100 flex flex-col gap-5 pr-[19px]">
      <GoToAroundTouristButton {...goToAroundTouristButtonProps} />
      <TourListButton />
    </div>
  );
}
