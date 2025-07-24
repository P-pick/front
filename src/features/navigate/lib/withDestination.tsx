import { Suspense, useEffect } from 'react';
import { useStore } from 'zustand';
import { useSearchParams } from 'react-router-dom';

import {} from '@/features/navigate';
import {
  useFollowAlongStore,
  useMapLevelStore,
  useTransportationStore,
  SelectTransportationFromGeoMap,
  isValidationLocation,
} from '@/features/navigate';
import { LoadingSpinner, useCurrentLocation } from '@/shared';

import type { GeoTripLocation } from '@/shared';

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
    const { isFollowAlong, reset: resetFollowAlong } =
      useStore(useFollowAlongStore);
    const { reset: resetTransportation } = useStore(useTransportationStore);
    const { reset: resetMapLevel } = useStore(useMapLevelStore);

    const [searchParams] = useSearchParams();
    const lng = searchParams.get('lnt');
    const lat = searchParams.get('lat');

    const destination = {
      lng: lng ? parseFloat(lng) : 0,
      lat: lat ? parseFloat(lat) : 0,
    };

    const { geoLocation } = useCurrentLocation();

    useEffect(() => {
      return () => {
        resetTransportation();
        resetMapLevel();
        resetFollowAlong();
      };
    }, [resetFollowAlong, resetTransportation, resetMapLevel]);

    if (
      !isValidationLocation(geoLocation) ||
      !isValidationLocation(destination)
    ) {
      return <LoadingSpinner centered={true} />;
    }

    return (
      <>
        {!isFollowAlong && (
          <SelectTransportationFromGeoMap
            start={geoLocation}
            end={destination}
          />
        )}
        <Suspense fallback={<LoadingSpinner centered={true} />}>
          <WrappedComponent
            {...(props as P)}
            start={geoLocation}
            end={destination}
          />
        </Suspense>
      </>
    );
  };
}
