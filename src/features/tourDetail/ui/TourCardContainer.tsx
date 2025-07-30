import { Suspense, useState } from 'react';

import {
  TourCardNavigate,
  TourInformation,
  TourOverview,
  TourReview,
} from '@/features/tourDetail';
import { LoadingSpinner } from '@/shared';

import type { AroundContentTypeId } from '@/entities/tour';

interface TourCardContainerProps {
  dist: string;
  contenttypeid: AroundContentTypeId;
  contentid: string;
}

export default function TourCardContainer({
  dist,
  contenttypeid,
  contentid,
}: TourCardContainerProps) {
  const [currentSection, setCurrentSection] = useState('overview');

  return (
    <>
      <Suspense fallback={<LoadingSpinner centered={true} />}>
        <TourOverview distance={dist} tourContentId={contentid} />
      </Suspense>
      <TourCardNavigate
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      <Suspense fallback={<LoadingSpinner centered={true} />}>
        <>
          {currentSection === 'overview' && (
            <TourInformation
              contentId={contentid}
              contentTypeId={contenttypeid}
            />
          )}
          {currentSection === 'review' && <TourReview contentId={contentid} />}
        </>
      </Suspense>
    </>
  );
}
