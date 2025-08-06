import { LoadingSpinner } from '@/shared/ui';

interface TourSwiperLoadingOverlayProps {
  isInitializing: boolean;
}

export default function TourSwiperLoadingOverlay({
  isInitializing,
}: TourSwiperLoadingOverlayProps) {
  if (isInitializing) {
    return (
      <div className="absolute inset-0 z-50 bg-white flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return null;
}
