import { BackButton, MenuIcon } from '@/components';
import { AroundTouristNavigate } from '@/pages/geoMap/components/geoAroundTourist';

export default function TourList() {
  return (
    <>
      <div className="h-full w-full relative">
        <div className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)">
          <BackButton />
          <h1>리스트</h1>
          <MenuIcon />
        </div>
      </div>
    </>
  );
}
