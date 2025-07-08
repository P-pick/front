import { BottomSheet, LoadingSpinner, TourCard } from '@/components';
import { TourOverView } from '@/pages/tour/geotrip/components';
import { useStartTrip } from '@/pages/tour/geotrip/lib';
import type { TourItem } from '@/pages/types';
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
    <div className="absolute w-full h-full bottom-0 left-0">
      <BottomSheet
        isOpen={openAttractionDetail}
        onClose={() => setOpenAttractionDetail(false)}
        initialY="20%"
        minHeight={600}
      >
        <BottomSheet.Content>
          <div className="bg-white w-full h-300">
            <TourCard
              title={tourist.title}
              distance={tourist.dist}
              imgUrl={tourist.firstimage || ''}
            />
            <div className="flex-1">
              <Suspense fallback={<LoadingSpinnerInTourist />}>
                <TourOverView contentId={tourist.contentid} />
              </Suspense>
            </div>
          </div>
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <div className="absolute left-0 bottom-0 bg-gradient-to-t from-white to-white/90 w-full h-full flex justify-center items-center z-(--z-layer9)">
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
        </BottomSheet.Footer>
      </BottomSheet>
    </div>
  );
}
