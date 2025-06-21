import type { TourSummary } from '../../types';
import { PlayTTSButton, TourListIcon } from './';

export default function OverlayButtonGroup({ overview }: TourSummary) {
  return (
    <div className="absolute bottom-1/2 right-0 z-100 flex flex-col gap-5 pr-[19px]">
      <PlayTTSButton text={overview} />
      <TourListIcon />
    </div>
  );
}
