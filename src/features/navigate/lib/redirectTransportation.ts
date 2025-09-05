import type { TransportationType } from '@/entities/navigate';
import type { GeoTripLocation } from '@/shared';

interface GettingPoint {
  start: GeoTripLocation;
  end: GeoTripLocation;
  vehicle: TransportationType;
}

export default function handleRedirectTransportation(
  destination: GettingPoint,
) {
  const { start, end, vehicle } = destination;
  window.location.href = `http://m.map.kakao.com/scheme/route?sp=${start.lat},${start.lng}&ep=${end.lat},${end.lng}&by=${vehicle}`;
}
