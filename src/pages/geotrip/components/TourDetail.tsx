import { DistanceTimeInfo } from './';
import type { TourItemWithDetail } from '@/pages/geotrip/types';

export default function TourDetail({
  overview,
  dist,
  title,
}: Pick<TourItemWithDetail, 'title' | 'dist' | 'overview'>) {
  return (
    <div className="max-w-[375px] h-110 bg-white px-5  pt-[15px] text-black">
      <h2 className="font-semibold text-2xl mb-3.5">{title}</h2>
      <DistanceTimeInfo dist={dist} iconFill="#00000" />
      <p className="mt-[13px]">{overview}</p>
      <button
        type="button"
        className="absolute left-1/2 bottom-6 -translate-x-1/2 bg-gradient-to-r z-(--z-layer6) from-[#FA812F] to-[#FA4032] rounded-[15px] w-[320px] h-[50px] text-black font-bold text-[16px] shadow-[0_4px_16px_0_rgba(250,129,47,0.3)]"
      >
        여행 시작하기
      </button>
    </div>
  );
}
