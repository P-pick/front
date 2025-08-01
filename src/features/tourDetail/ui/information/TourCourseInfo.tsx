import { InfoLayout } from '@/features/tourDetail';

import type { TourCourse, TourDetailCommon } from '@/entities/tour';

interface TourCourseInfoProps {
  common: TourDetailCommon;
  intro: TourCourse;
}

export default function TourCourseInfo({ common }: TourCourseInfoProps) {
  return (
    <InfoLayout>
      <InfoLayout.Header common={common}></InfoLayout.Header>
      <InfoLayout.Content></InfoLayout.Content>
      <InfoLayout.Footer common={common}></InfoLayout.Footer>
    </InfoLayout>
  );
}
