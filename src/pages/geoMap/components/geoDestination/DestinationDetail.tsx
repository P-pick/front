import { useMemo } from 'react';
import { getSelectedTransportationPolylines } from '../../lib/transportation';
import type { PolyFeatures, TransportationType } from '../../types';
import { gettingConversion } from '../../lib/utils';

interface DestinationDetailProps {
  vehicle: TransportationType;
  features: PolyFeatures;
}

export default function DestinationDetail({
  vehicle,
  features,
}: DestinationDetailProps) {
  const polylines = useMemo(() => {
    if (features) {
      return getSelectedTransportationPolylines(vehicle, features);
    }
    return [];
  }, [vehicle, features]);
  const takeTimeToGo = useMemo(() => {
    if (polylines.length === 0 || !polylines[0]?.totalTime) {
      return null;
    }
    return gettingConversion.conversionSecToHour(polylines[0].totalTime);
  }, [polylines]);

  const takeDistanceToGo = useMemo(() => {
    if (polylines.length === 0 || !polylines[0]?.totalDistance) {
      return null;
    }
    return gettingConversion.conversionPathDistance(polylines[0].totalDistance);
  }, [polylines]);

  return (
    <div className="absolute bottom-0 left-0 z-(--z-layer2) w-full h-1/5 p-3">
      <div className="w-full h-full bg-white flex-col p-3">
        <h2 className="text-xs text-blue-400 font-semibold">예상 시간</h2>
        <p className="text-xs">
          {takeTimeToGo && takeTimeToGo.hours > 0 ? (
            <>
              <span className="text-xl font-bold">{takeTimeToGo.hours}</span>
              시간&nbsp;
            </>
          ) : (
            ''
          )}
          {takeTimeToGo && (
            <span className="text-xl font-bold">{takeTimeToGo.minutes}</span>
          )}
          분
        </p>
        <div>
          <span className="text-xs">{takeDistanceToGo}</span>
        </div>
      </div>
    </div>
  );
}
