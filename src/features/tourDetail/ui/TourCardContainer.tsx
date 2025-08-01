import { Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  TourCardNavigate,
  TourInformation,
  TourOverview,
  TourReview,
} from '@/features/tourDetail';
import { LoadingSpinner, SwitchCase } from '@/shared';

import type { AroundContentTypeId } from '@/entities/tour';
import type { TourSectionType } from '@/features/tourDetail';

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
      <Suspense fallback={<LoadingSpinner centered={true} />}>
        <TourOverview distance={dist} tourContentId={contentid} />
      </Suspense>
      <TourCardNavigate
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      <Suspense fallback={<LoadingSpinner centered={true} />}>
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
                  <TourInformation
                    contentId={contentid}
                    contentTypeId={contenttypeid}
                  />
                ),
                review: <TourReview contentId={contentid} />,
              }}
              defaultComponent={<div>해당 섹션은 준비 중입니다.</div>}
            />
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </>
  );
}
