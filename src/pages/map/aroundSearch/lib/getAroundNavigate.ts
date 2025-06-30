import { useState } from 'react';
import { markerImageMap, markerList } from '@/pages/const/MARKER';
import type { AroundContentTypeId, GeoTripLocation } from '@/pages/types';
import useAroundTouristQuery from '../service/getAroundTouristMapData';
import type { MarkerType } from '../types';

const useGetAroundNavigate = (destination: GeoTripLocation) => {
  const [contentTypeIdGroup, setContentTypeIdGroup] = useState<MarkerType[]>([
    { contentTypeId: '12', imageSrc: markerImageMap['12'], altText: '관광지' },
  ]);
  const [selectedContentTypeId, setSelectedContentTypeId] =
    useState<AroundContentTypeId>('12');

  const { aroundTouristObjects, setActiveTypes } = useAroundTouristQuery(
    destination,
    selectedContentTypeId
  );

  const handleAdditionalMarkerClick = (contentTypeId: AroundContentTypeId) => {
    setContentTypeIdGroup(prev => {
      const existingType = prev.find(
        item => item.contentTypeId === contentTypeId
      );
      if (existingType) return prev;
      const newMarker = markerList.find(
        marker => marker.contentTypeId === contentTypeId
      );
      if (!newMarker) return prev;
      return [...prev, newMarker];
    });
    setSelectedContentTypeId(contentTypeId);
  };

  const removeMakerFilter = (contentTypeId: AroundContentTypeId) => {
    setContentTypeIdGroup(prev =>
      prev.filter(marker => marker.contentTypeId !== contentTypeId)
    );
    setActiveTypes(prev => prev?.filter(item => item !== contentTypeId));
    setSelectedContentTypeId('');
  };

  return {
    contentTypeIdGroup,
    aroundTouristObjects,
    handleAdditionalMarkerClick,
    removeMakerFilter,
  };
};

export default useGetAroundNavigate;
