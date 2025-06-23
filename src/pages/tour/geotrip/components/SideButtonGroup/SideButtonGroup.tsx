import type { TourSummary } from '../../types';
import { GoToAroundTouristButton, PlayTTSButton, TourListButton } from './';

export default function OverlayButtonGroup({
  overview,
  mapx,
  mapy,
  contentid,
}: TourSummary) {
  const aroundTouristProps = {
    mapx,
    mapy,
    contentid,
  };

  return (
    <div className="absolute bottom-1/2 right-0 z-100 flex flex-col gap-5 pr-[19px]">
      <PlayTTSButton text={overview} />
      <GoToAroundTouristButton {...aroundTouristProps} />
      <TourListButton />
    </div>
  );
}
