import { BottomSheet, LoadingSpinner } from '@/components';
import { Suspense } from 'react';
import type { TourSummary } from '../types';
import { StartTripButton, TourCardContainer, TourOverView } from './';

interface TourBottomSheetProps extends TourSummary {
  isOpen: boolean;
  onClose: () => void;
}

export default function TourBottomSheet({
  title,
  dist,
  firstimage,
  contenttypeid,
  isOpen,
  contentid,
  mapx,
  mapy,
  onClose,
}: TourBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} showOverlay={false}>
      <div className="bg-white w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <TourCardContainer
            title={title}
            dist={dist}
            firstimage={firstimage}
            contenttypeid={contenttypeid}
            contentid={contentid}
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <TourOverView contentId={contentid} />
        </Suspense>
        <div className="mt-4 w-full flex items-center justify-center">
          <StartTripButton
            lng={mapx}
            lat={mapy}
            className="bg-gradient-to-r from-primary-orange to-primary-red rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] shadow-[0_4px_16px_0_rgba(250,129,47,0.3)]"
          />
        </div>
      </div>
    </BottomSheet>
  );
}
