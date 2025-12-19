import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { tourQueries, type TourItem } from '@/entities/tour';
import { LoadingSpinner } from '@/shared/ui';
import { TourSlide } from '@/features/tourShort';

export default function ShareTrip() {
  const { contentId } = useParams();
  const navigate = useNavigate();

  const { data: tourInfo, isLoading } = useQuery({
    ...tourQueries.detailCommon(contentId!),
    enabled: !!contentId,
  });

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleRedirectMainPage = () => {
    navigate('/tour/geo-trip?distance=20000&tour-type=12');
  };

  return (
    <div className="relative w-full h-full">
      <TourSlide
        tourInfo={tourInfo as TourItem}
        openBottomSheet={handleRedirectMainPage}
      />
    </div>
  );
}
