import { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

import { AroundContent, markerImageMap } from '@/features/aroundTourist';

import type { TourItem } from '@/entities/tour';
import type { GeoTripLocation } from '@/shared';

type NearbyTouristAttractionPinPointType = TourItem;

interface NearbyTouristAttractionPinPointProps {
  tourist: NearbyTouristAttractionPinPointType;
  location?: GeoTripLocation;
}

export default function NearbyTouristAttractionPinPoint({
  tourist,
}: NearbyTouristAttractionPinPointProps) {
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
          options: {
            offset: {
              x: 18,
              y: 40,
            },
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
