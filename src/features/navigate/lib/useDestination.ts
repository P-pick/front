import { useStore } from 'zustand';
import {
  useFollowAlongStore,
  useMapLevelStore,
  useTransportationStore,
} from '.';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSuspenseLocation } from '@/shared';
import type { TransportationType } from '@/entities/navigate';

const useDestination = () => {
  const [searchParams] = useSearchParams();

  const { reset: resetFollowAlong } = useStore(useFollowAlongStore);
  const { reset: resetTransportation, setVehicle } = useStore(
    useTransportationStore,
  );
  const { reset: resetMapLevel } = useStore(useMapLevelStore);

  //이동수단
  const vehicle = searchParams.get('vehicle');

  useEffect(() => {
    setVehicle(vehicle as TransportationType);
  }, [vehicle]);

  const geoLocation = getSuspenseLocation();

  useEffect(() => {
    return () => {
      resetTransportation();
      resetMapLevel();
      resetFollowAlong();
    };
  }, [resetFollowAlong, resetTransportation, resetMapLevel]);

  return { geoLocation };
};

export default useDestination;
