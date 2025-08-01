import { tourDetailSVG } from '@/assets';

import { SafeHtmlRenderer } from '@/shared';

import type { TourCourse, TourDetailCommon } from '@/entities/tour';

interface TourCourseInfoProps {
  common: TourDetailCommon;
  intro: TourCourse;
}

export default function TourCourseInfo({ common }: TourCourseInfoProps) {
  return (
    <>
      <section className="p-3 w-full flex flex-col gap-2 text-sm">
        {common.homepage && (
          <div className="flex gap-3 justify-start items-center">
            <tourDetailSVG.WWWIcon className="w-3 h-3" />
            <SafeHtmlRenderer html={common.homepage} />
          </div>
        )}
      </section>
    </>
  );
}
