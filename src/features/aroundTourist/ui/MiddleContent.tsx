import { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

import { AroundContent } from '@/features/aroundTourist';

import type { GeoTripLocation } from '@/shared';
import type { TourItem } from '@/entities/tour';

interface MiddleContentProps {
  location: GeoTripLocation;
  tourist: TourItem;
}

export default function MiddleContent({
  location,
  tourist,
}: MiddleContentProps) {
  const [openAttractionDetail, setOpenAttractionDetail] = useState(true);

  return (
    <>
      <MapMarker
        zIndex={999}
        position={location}
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
