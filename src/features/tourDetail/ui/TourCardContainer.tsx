import { Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  TourCardNavigate,
  TourInformation,
  TourOverview,
  ReviewSkeleton,
  DetailOverviewSkeleton,
} from '@/features/tourDetail';
import { TourReviewList } from '@/features/tourReview';
import { QueryErrorBoundary, SwitchCase } from '@/shared';

import type { TourSectionType } from '@/features/tourDetail';
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
  const [currentSection, setCurrentSection] =
    useState<TourSectionType>('overview');

  return (
    <>
      <QueryErrorBoundary>
        <Suspense fallback={<DetailOverviewSkeleton />}>
          <TourOverview distance={dist} tourContentId={contentid} />
        </Suspense>
      </QueryErrorBoundary>
      <TourCardNavigate
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SwitchCase
            value={currentSection}
            cases={{
              overview: (
                <QueryErrorBoundary>
                  <Suspense fallback={<ReviewSkeleton />}>
                    <TourInformation
                      contentId={contentid}
                      contentTypeId={contenttypeid}
                    />
                  </Suspense>
                </QueryErrorBoundary>
              ),
              review: (
                <QueryErrorBoundary>
                  <Suspense fallback={<ReviewSkeleton />}>
                    <TourReviewList contentId={contentid} />
                  </Suspense>
                </QueryErrorBoundary>
              ),
            }}
            defaultComponent={<div>해당 섹션은 준비 중입니다.</div>}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
