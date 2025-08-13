import { Suspense, useEffect } from 'react';
import { useStore } from 'zustand';
import { useSearchParams } from 'react-router-dom';

import {
  useFollowAlongStore,
  useMapLevelStore,
  useTransportationStore,
  SelectTransportationFromGeoMap,
  isValidationLocation,
  DepartureAndArrivalAddress,
} from '@/features/navigate';
import { LoadingSpinner, useCurrentLocation } from '@/shared';

import type { GeoTripLocation } from '@/shared';
import type { TransportationType } from '@/entities/navigate';

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
    const { reset: resetTransportation, setVehicle } = useStore(
      useTransportationStore,
    );
    const { reset: resetMapLevel } = useStore(useMapLevelStore);
    const [searchParams] = useSearchParams();

    //좌표
    const lng = searchParams.get('lnt');
    const lat = searchParams.get('lat');

    const destination = {
      lng: lng ? parseFloat(lng) : 0,
      lat: lat ? parseFloat(lat) : 0,
    };

    //컨텐츠 ID, Type
    const id = searchParams.get('id') && atob(searchParams.get('id') as string);

    //이동수단
    const vehicle = searchParams.get('vehicle');

    useEffect(() => {
      setVehicle(vehicle as TransportationType);
    }, [vehicle]);

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
      !isValidationLocation(destination) ||
      !id
    ) {
      return <LoadingSpinner centered={true} />;
    }

    return (
      <>
        {!isFollowAlong && (
          <Suspense fallback={<></>}>
            <div className="px-5 w-full h-auto bg-white z-(--z-layer2)">
              <DepartureAndArrivalAddress start={geoLocation} id={id} />
              <SelectTransportationFromGeoMap />
            </div>
          </Suspense>
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
