import { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import type { TourItem } from '@/pages/types';
import { markerImageMap } from '@/pages/const/MARKER';
import { BottomSheet, TourCard } from '@/components';

type NearbyTouristAttractionPinPointProps = TourItem;

export default function NearbyTouristAttractionPinPoint(
  tourist: NearbyTouristAttractionPinPointProps
) {
  const [openAttractionDetail, setOpenAttractionDetail] = useState(false);

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
      <div className="absolute w-full h-full bottom-0 left-0">
        <BottomSheet
          isOpen={openAttractionDetail}
          onClose={() => setOpenAttractionDetail(false)}
          initialY="60%"
          minHeight={400}
        >
          <BottomSheet.Content>
            <div className="bg-red-100 w-full h-300">
              <TourCard
                title={tourist.title}
                distance={tourist.title}
                imgUrl={tourist.firstimage || ''}
              />
            </div>
          </BottomSheet.Content>
        </BottomSheet>
      </div>
    </>
  );
}
