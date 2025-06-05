import { BackButton, MenuIcon } from '@/components';
import GeoDestination from './components/GeoDestination';
import GeoAroundTouristMap from './components/GeoAroundTouristMap';

export default function GeoMap() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-between p-3 items-center">
        <BackButton />
        <span>지도</span>
        <MenuIcon />
      </div>
      <div className="flex-1">
        <div className="w-full h-full relative">
          <GeoAroundTouristMap />
          {/* <GeoDestination /> */}
        </div>
      </div>
    </div>
  );
}
