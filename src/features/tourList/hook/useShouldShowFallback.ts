// hooks/useShouldShowFallback.ts
import { tourQueries, type AroundContentTypeId } from '@/entities/tour';
import { type GeoTripLocation } from '@/shared';
import { useQueryClient } from '@tanstack/react-query';

interface useShouldShowFallbackParams {
  location: GeoTripLocation;
  radius: string;
  localContentTypeId: AroundContentTypeId;
  deferredContentTypeId: AroundContentTypeId;
}

export const useShouldShowFallback = ({
  location,
  radius,
  localContentTypeId,
  deferredContentTypeId,
}: useShouldShowFallbackParams): boolean => {
  const queryClient = useQueryClient();

  const queryOptions = tourQueries.locationBasedList({
    location,
    radius,
    contentTypeId: localContentTypeId,
  });
  const cachedData = queryClient.getQueryData(queryOptions.queryKey);

  const hasCache = Boolean(cachedData);
  const isSwitching = localContentTypeId !== deferredContentTypeId;

  return isSwitching && !hasCache;
};
