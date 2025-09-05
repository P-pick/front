import { BookmarkButtonContainer } from '@/features/bookmark';
import type { TourSummary } from '../../types';
import { GoToAroundTouristButton } from './';

interface OverlayButtonGroupProps {
  goToAroundTouristButtonProps: TourSummary;
}

export default function SideButtonGroupContainer({
  goToAroundTouristButtonProps,
}: OverlayButtonGroupProps) {
  return (
    <div className="absolute bottom-1/2 right-0 z-100 flex flex-col gap-5 pr-[19px]">
      <GoToAroundTouristButton {...goToAroundTouristButtonProps} />
      <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer">
        <BookmarkButtonContainer
          contentId={goToAroundTouristButtonProps.contentid}
        />
      </span>
    </div>
  );
}
