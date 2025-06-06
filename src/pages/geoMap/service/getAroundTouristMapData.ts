import api from '@/config/instance';
import { type GeoTripLocation, type TourItem } from '@/pages/types';
import { useQuery } from '@tanstack/react-query';
import type { AroundContentTypeId } from '../types';
import { useEffect, useState } from 'react';

export type LocationBasedItemRequest = {
  location: GeoTripLocation | null;
  contentTypeId?: AroundContentTypeId;
};

type LocationBasedItemResponse = Promise<{
  items: {
    item: TourItem[];
  };
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}>;

const getAroundTouristMapData = async ({
  location,
  contentTypeId,
}: LocationBasedItemRequest): LocationBasedItemResponse => {
  if (!location) return Promise.reject('위치 정보가 없습니다.');

  const response = await api.get(`/locationBasedList2`, {
    params: {
      mapX: location.longitude,
      mapY: location.latitude,
      arrange: 'E',
      radius: '3000',
      numOfRows: 30,
      contentTypeId,
      pageNo: 1,
    },
  });

  return response.data.response.body;
};

const useAroundTouristQuery = (
  destination: GeoTripLocation,
  contentTypeId: AroundContentTypeId
) => {
  const [aroundTouristObjects, setAroundTouristObjects] =
    useState<TourItem[]>();

  const { data } = useQuery({
    queryKey: ['aroundTouristMapData', destination, contentTypeId],
    queryFn: () =>
      getAroundTouristMapData({
        location: destination,
        contentTypeId: contentTypeId, // 기본 관광지 타입
      }),
    enabled: !!destination,
  });

  useEffect(() => {
    setAroundTouristObjects(prev => {
      const newItems = data?.items.item || [];
      const updatedItems = [...(prev ?? []), ...newItems];
      const uniqueContentId = Array.from(
        new Map(updatedItems.map(item => [item.contentid, item])).values()
      );
      return uniqueContentId;
    });
  }, [data]);

  return {
    aroundTouristObjects,
    setAroundTouristObjects,
  };
};

export default useAroundTouristQuery;
