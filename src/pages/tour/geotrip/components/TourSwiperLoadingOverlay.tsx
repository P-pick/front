import { LoadingSpinner } from '@/components';

interface TourSwiperLoadingOverlayProps {
  isInitializing: boolean;
  isFetchingPreviousPage: boolean;
}

export default function TourSwiperLoadingOverlay({
  isInitializing,
  isFetchingPreviousPage,
}: TourSwiperLoadingOverlayProps) {
  if (isInitializing) {
    return (
      <div className="absolute inset-0 z-50 bg-white flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isFetchingPreviousPage) {
    return (
      <div className="absolute top-0 left-0 w-full flex justify-center items-center z-40">
        <LoadingSpinner />
      </div>
    );
  }

  return null;
}
