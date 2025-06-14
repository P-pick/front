import api from '@/config/instance';
import { type GeoTripLocation, type TourItem } from '@/pages/types';
import { useQueries } from '@tanstack/react-query';
import type { AroundContentTypeId } from '../types';
import { useEffect, useState } from 'react';

export type LocationBasedItemRequest = {
  location: GeoTripLocation;
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
  if (contentTypeId?.length === 0) {
    return Promise.reject('콘텐츠 타입이 없습니다.');
  }
  if (!location) return Promise.reject('위치 정보가 없습니다.');

  const response = await api.get(`/locationBasedList2`, {
    params: {
      mapX: location.lng,
      mapY: location.lat,
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
  const [activeTypes, setActiveTypes] = useState<AroundContentTypeId[]>([]);

  const combinedQueries = useQueries({
    queries: activeTypes.map(type => ({
      queryKey: ['aroundTouristMapData', destination, type],
      queryFn: () =>
        getAroundTouristMapData({ location: destination, contentTypeId: type }),
    })),
    combine: results => {
      return {
        data: results.map(result => result.data?.items.item || []),
        pending: results.some(result => result.isPending),
      };
    },
  });

  useEffect(() => {
    setActiveTypes(prev => {
      if (prev.includes(contentTypeId)) {
        return prev;
      }
      return [...prev, contentTypeId];
    });
  }, [contentTypeId]);

  const combinedDataFlat = combinedQueries.data.flatMap(data => data || []);

  return {
    aroundTouristObjects: combinedDataFlat,
    setActiveTypes,
    pending: combinedQueries.pending,
  };
};

export default useAroundTouristQuery;
