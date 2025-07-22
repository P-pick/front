import { useCurrentLocation } from '@/lib';
import type { GeoTripLocation } from '@/pages/types';
import { LoadingSpinner } from '@/shared';
import { useSearchParams } from 'react-router-dom';
import { isValidationLocation } from '../../lib';

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
    const [searchParams] = useSearchParams();
    const lng = searchParams.get('lnt');
    const lat = searchParams.get('lat');

    const destination = {
      lng: lng ? parseFloat(lng) : 0,
      lat: lat ? parseFloat(lat) : 0,
    };

    const { geoLocation } = useCurrentLocation();

    if (
      !isValidationLocation(geoLocation) ||
      !isValidationLocation(destination)
    ) {
      return <LoadingSpinner centered={true} />;
    }

    return (
      <WrappedComponent
        {...(props as P)}
        start={geoLocation}
        end={destination}
      />
    );
  };
}
