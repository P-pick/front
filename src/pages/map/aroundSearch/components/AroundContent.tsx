import { useStartTrip } from '@/features/tour';
import { TourCardContainer } from '@/features/tour/ui';
import type { TourItem } from '@/pages/types';
import { BottomSheet, LoadingSpinner } from '@/shared/ui';
import { Suspense } from 'react';

function LoadingSpinnerInTourist() {
  return (
    <div className="flex items-center justify-center flex-1">
      <LoadingSpinner />
    </div>
  );
}

interface AroundContentProps {
  tourist: TourItem;
  openAttractionDetail: boolean;
  setOpenAttractionDetail: (open: boolean) => void;
}

export default function AroundContent({
  tourist,
  openAttractionDetail,
  setOpenAttractionDetail,
}: AroundContentProps) {
  const { handleStartTrip } = useStartTrip();

  if (!tourist) {
    return null;
  }

  return (
    <BottomSheet
      isOpen={openAttractionDetail}
      onClose={() => setOpenAttractionDetail(false)}
    >
      <div className="bg-white w-full">
        <div className="flex-1">
          <Suspense fallback={<LoadingSpinnerInTourist />}>
            <TourCardContainer
              contentid={tourist.contentid}
              contenttypeid={tourist.contenttypeid}
              title={tourist.title}
              dist={tourist.dist}
            />
          </Suspense>
        </div>
      </div>
      <div className="mt-4 w-full flex items-center justify-center">
        <button
          type="button"
          className="bg-gradient-to-r from-primary-orange to-primary-red rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] shadow-[0_4px_16px_0_rgba(250,129,47,0.3)] cursor-pointer"
          onClick={() =>
            handleStartTrip({
              lng: tourist.mapx,
              lat: tourist.mapy,
            })
          }
        >
          여행 시작하기
        </button>
      </div>
    </BottomSheet>
  );
}
