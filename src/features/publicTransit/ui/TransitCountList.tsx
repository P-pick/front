import { useMemo } from 'react';

import type { PUBLICTRANSIT } from '@/entities/navigate';

interface TransitCountListProps {
  requestParams?: PUBLICTRANSIT.RequestParameters;
}

export default function TransitCountList({
  requestParams,
}: TransitCountListProps) {
  const totalCount = useMemo(() => {
    if (requestParams) {
      return (
        requestParams.busCount +
        requestParams.subwayCount +
        requestParams.subwayBusCount
      );
    }
  }, [requestParams]);

  return (
    <div className="w-full h-8 border-b-1 border-gray-300 flex justify-start items-center px-2">
      <ul className="flex justify-center items-center gap-2 text-xs font-bold">
        <li>전체 {totalCount ?? 0}</li>
        <li>버스 {requestParams?.busCount ?? 0}</li>
        <li>지하철 {requestParams?.subwayCount ?? 0}</li>
        <li>버스+지하철 {requestParams?.subwayBusCount ?? 0}</li>
      </ul>
    </div>
  );
}
