import { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import type { TourItem } from '@/pages/types';
import { markerImageMap } from '@/pages/const/MARKER';
import { BottomSheet } from '@/components';
import { TourDetail } from '@/pages/tour/geotrip/components';

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
      <div className="w-full h-11/12 bottom-0 left-0">
        <BottomSheet
          isOpen={openAttractionDetail}
          onClose={() => setOpenAttractionDetail(false)}
          initialY="65%"
          minHeight={200}
        >
          <BottomSheet.Content>
            <TourDetail {...{ overview: '1', ...tourist }} />
          </BottomSheet.Content>
        </BottomSheet>
      </div>
    </>
  );
}
