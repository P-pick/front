import type { AroundTourInfo } from '@/pages/map/aroundSearch/types';
import { DistanceTimeInfo } from '@/pages/tour/components';

export default function TourDetail({ overview, dist, title }: AroundTourInfo) {
  return (
    <div className="w-full bg-white px-5 pt-[15px] text-black h-200">
      <h2 className="font-semibold text-2xl mb-3">{title}</h2>
      <span className="text-[12px]">
        <DistanceTimeInfo dist={dist} iconFill="#00000" />
      </span>
      <p className="mt-[13px]">{overview}</p>
    </div>
  );
}
