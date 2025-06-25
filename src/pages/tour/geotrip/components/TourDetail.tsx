import { DistanceTimeInfo } from '@/components';
import type { TourSummary } from '../types';

export default function TourDetail({ dist, title }: TourSummary) {
  return (
    <div className="w-full bg-white px-5 pt-[15px] text-black h-200">
      <h2 className="font-semibold text-2xl mb-3">{title}</h2>
      <span className="text-[12px]">
        <DistanceTimeInfo dist={dist} iconFill="#00000" />
      </span>
    </div>
  );
}
