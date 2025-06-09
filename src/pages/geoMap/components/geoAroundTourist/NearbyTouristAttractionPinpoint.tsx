import { markerImageMap } from '@/pages/const/MARKER';
import type { TourItem } from '@/pages/types';
import { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import DetailsOfNearbyTouristAttractions from './DetailsOfNearbyTouristAttractions';

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
      {openAttractionDetail && <DetailsOfNearbyTouristAttractions />}
    </>
  );
}
