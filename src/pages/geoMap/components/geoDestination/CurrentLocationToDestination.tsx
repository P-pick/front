import useCurrentLocation from '@/lib/useCurrentLocation';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components';
import GeoDestinationMap from './GeoDestinationMap';
import type { GeoTripLocation } from '@/pages/types';

const destination = {
  lat: 37.629362,
  lng: 127.095991,
};

export default function CurrentLocationToDestination() {
  const { geoLocation } = useCurrentLocation();

  const inValidationLocation = (
    location: GeoTripLocation
  ): Required<GeoTripLocation> => {
    return typeof location.lat === 'number' && typeof location.lng === 'number';
  };

  return (
    <>
      <Suspense
        fallback={
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-(--z-layer3) flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        {inValidationLocation(geoLocation) &&
          inValidationLocation(destination) && (
            <GeoDestinationMap start={geoLocation} end={destination} />
          )}
      </Suspense>
    </>
  );
}
