import { MapMarker } from 'react-kakao-maps-sdk';
import AroundContent from './AroundContent';
import type { GeoTripLocation, TourItem } from '@/pages/types';
import { useState } from 'react';

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
