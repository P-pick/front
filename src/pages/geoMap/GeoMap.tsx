import { BackButton, MenuIcon } from '@/components';
import { GeoAroundTouristMap, GeoDestinationNavigateMap } from './components';

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
          {/* <GeoDestinationNavigateMap /> */}
        </div>
      </div>
    </div>
  );
}
