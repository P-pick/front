import { commonSVG } from '@/assets';

import { TourTypeBadge, DistanceTimeInfo } from '@/shared';

import type { AroundContentTypeId } from '@/pages/types';
import { useState } from 'react';
import TourCardNavigate from './TourCardNavigate';
import TourOverview from './TourOverview';
import TourReview from './TourReivew';

interface TourCardProps {
  title: string;
  distance: string;
  imgUrl: string;
  tourTypeId: AroundContentTypeId;
  businessHours: string;
  address: string;
  contentId: string;
}
export default function TourCard({
  title,
  distance,
  imgUrl,
  tourTypeId,
  businessHours,
  address,
  contentId,
}: TourCardProps) {
  const [currentSection, setCurrentSection] = useState('overview');

  return (
    <section>
      <div className="py-6 px-5 flex">
        <div className="mr-5">
          <div className="flex gap-1.5 mb-2 items-center">
            <h1 className="font-bold text-[24px] w-38">{title}</h1>
            <TourTypeBadge contenttypeid={tourTypeId} className="text-center" />
          </div>
          <div className="flex items-center gap-1.5 mb-2">
            <DistanceTimeInfo
              dist={distance}
              className="text-primary-red font-bold"
              iconFill="text-primary-red "
            />
            <span>{address}</span>
          </div>
          <span>{businessHours}</span>
          <div className="flex items-center gap-4 mt-7">
            <commonSVG.HeartIcon />
            <commonSVG.ShareIcon />
          </div>
        </div>
        <div className="w-[130px] h-[130px] rounded-[5px] overflow-hidden">
          <img
            src={imgUrl}
            className="w-full h-full object-cover"
            alt="tourDetailImage"
          />
        </div>
      </div>
      <TourCardNavigate
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      {currentSection === 'overview' && <TourOverview description={'12312'} />}
      {currentSection === 'review' && <TourReview contentId={contentId} />}
    </section>
  );
}
