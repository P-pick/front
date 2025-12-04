import { Suspense } from 'react';
import { useStore } from 'zustand';
import { useSearchParams } from 'react-router-dom';

import {
  useFollowAlongStore,
  SelectTransportationFromGeoMap,
  isValidationLocation,
  DepartureAndArrivalAddress,
  DestinationSkeleton,
} from '@/features/navigate';
import { LoadingSpinner, QueryErrorBoundary } from '@/shared';

import type { GeoTripLocation } from '@/shared';
import useGettingLocation from './useGettingLocation';
import useDestination from './useDestination';

interface WithDestinationProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function withDestination<P extends WithDestinationProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function GeoDestinationMapWrapper(
    props: Omit<P, keyof WithDestinationProps>,
  ) {
    const { isFollowAlong } = useStore(useFollowAlongStore);
    const { geoLocation } = useDestination();
    const { destination } = useGettingLocation();
    const [searchParams] = useSearchParams();

    const id = searchParams.get('id') && atob(searchParams.get('id') as string);

    if (
      !isValidationLocation(geoLocation) ||
      !isValidationLocation(destination) ||
      !id
    ) {
      return <LoadingSpinner centered={true} />;
    }

    return (
      <>
        {!isFollowAlong && (
          <div className="px-5 w-full h-auto bg-white z-(--z-layer2)">
            <QueryErrorBoundary>
              <Suspense fallback={<DestinationSkeleton />}>
                <DepartureAndArrivalAddress start={geoLocation} id={id} />
              </Suspense>
            </QueryErrorBoundary>
            <SelectTransportationFromGeoMap />
          </div>
        )}
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner centered={true} />}>
            <WrappedComponent
              {...(props as P)}
              start={geoLocation}
              end={destination}
            />
          </Suspense>
        </QueryErrorBoundary>
      </>
    );
  };
}
