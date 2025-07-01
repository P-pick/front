import { Suspense, useEffect, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import type { GeoTripLocation, TourItem } from '@/pages/types';
import { markerImageMap } from '@/pages/const/MARKER';
import { BottomSheet, LoadingSpinner, TourCard } from '@/components';
import { TourOverView } from '@/pages/tour/geotrip/components';

interface AroundContentProps {
  tourist: TourItem;
  isFirst?: boolean;
  openAttractionDetail: boolean;
  setOpenAttractionDetail: (open: boolean) => void;
}

function AroundContent({
  tourist,
  isFirst = false,
  openAttractionDetail,
  setOpenAttractionDetail,
}: AroundContentProps) {
  useEffect(() => {
    if (isFirst) {
      setOpenAttractionDetail(true);
    }
  }, [tourist]);

  return (
    <div className="absolute w-full h-full bottom-0 left-0">
      <BottomSheet
        isOpen={openAttractionDetail}
        onClose={() => setOpenAttractionDetail(false)}
        initialY="55%"
        minHeight={200}
      >
        <BottomSheet.Content>
          <div className="bg-white w-full h-full">
            <TourCard
              title={tourist.title}
              distance={tourist.dist}
              imgUrl={tourist.firstimage || ''}
            />
            <Suspense fallback={<LoadingSpinner />}>
              <TourOverView contentId={tourist.contentid} />
            </Suspense>
          </div>
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <div className="absolute left-0 bottom-0 bg-gradient-to-t from-white to-white/90 w-full h-full flex justify-center items-center">
            <button
              type="button"
              className="bg-gradient-to-r from-primary-orange to-primary-red rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] shadow-[0_4px_16px_0_rgba(250,129,47,0.3)]"
              onClick={() => setOpenAttractionDetail(false)}
            >
              여행 시작하기
            </button>
          </div>
        </BottomSheet.Footer>
      </BottomSheet>
    </div>
  );
}

type NearbyTouristAttractionPinPointType = TourItem;

interface NearbyTouristAttractionPinPointProps {
  tourist: NearbyTouristAttractionPinPointType;
  location?: GeoTripLocation;
}

export default function NearbyTouristAttractionPinPoint({
  tourist,
  location,
}: NearbyTouristAttractionPinPointProps) {
  const [openAttractionDetail, setOpenAttractionDetail] = useState(false);

  if (location) {
    return (
      <>
        <MapMarker
          zIndex={999}
          position={location}
          onClick={() => setOpenAttractionDetail(prev => !prev)}
        ></MapMarker>
        <AroundContent
          tourist={tourist}
          isFirst={true}
          openAttractionDetail={openAttractionDetail}
          setOpenAttractionDetail={setOpenAttractionDetail}
        />
      </>
    );
  }

  return (
    <>
      <MapMarker
        key={tourist.contentid}
        position={{
          lat: tourist.mapy!,
          lng: tourist.mapx!,
        }}
        image={{
          src: markerImageMap[tourist.contenttypeid],
          size: {
            width: 38,
            height: 50,
          },
        }}
        onClick={() => setOpenAttractionDetail(prev => !prev)}
      ></MapMarker>
      <AroundContent
        tourist={tourist}
        openAttractionDetail={openAttractionDetail}
        setOpenAttractionDetail={setOpenAttractionDetail}
      />
    </>
  );
}
