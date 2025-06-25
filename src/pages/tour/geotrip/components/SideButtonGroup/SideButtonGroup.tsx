import type { TourSummary } from '../../types';
import { GoToAroundTouristButton, PlayTTSButton, TourListButton } from './';

interface OverlayButtonGroupProps {
  playTTSButtonProps: string;
  goToAroundTouristButtonProps: TourSummary;
}

export default function OverlayButtonGroup({
  playTTSButtonProps,
  goToAroundTouristButtonProps,
}: OverlayButtonGroupProps) {
  return (
    <div className="absolute bottom-1/2 right-0 z-100 flex flex-col gap-5 pr-[19px]">
      <PlayTTSButton text={playTTSButtonProps} />
      <GoToAroundTouristButton {...goToAroundTouristButtonProps} />
      <TourListButton />
    </div>
  );
}
