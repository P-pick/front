import type { GeoTripLocation } from '@/pages/types';
import type { TransportationType } from '../types';

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
