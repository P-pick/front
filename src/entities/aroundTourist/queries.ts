import {
  getAroundTouristMapData,
  getSelectedPinDetail,
} from '@/entities/aroundTourist';

import type { AroundContentTypeId } from '@/entities/tour';
import type { GetSelectedPinDetailRequest } from '@/entities/aroundTourist';
import type { GeoTripLocation } from '@/shared';

const getAroundTouristQueryOptions = (
  destination: GeoTripLocation,
  contentTypeId: AroundContentTypeId,
) => ({
  queryKey: ['aroundTouristMapData', destination, contentTypeId],
  queryFn: () =>
    getAroundTouristMapData({ location: destination, contentTypeId }),
});

const getSelectedPinDetailQueryOptions = ({
  contentId,
  contentTypeId,
}: GetSelectedPinDetailRequest) => ({
  queryKey: ['selectedPinDetail', contentId, contentTypeId],
  queryFn: () => getSelectedPinDetail({ contentId, contentTypeId }),
});

export const aroundTouristQueries = {
  list: getAroundTouristQueryOptions,
  detail: getSelectedPinDetailQueryOptions,
};
