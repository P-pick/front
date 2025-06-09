import { BackButton, MenuIcon } from '@/components';
import { CurrentLocationToDestination } from './components/geoDestination';
import GeoAroundTouristMap from './components/geoAroundTourist/GeoAroundTouristMap';

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
          <CurrentLocationToDestination />
          {/* <GeoAroundTouristMap /> */}
        </div>
      </div>
    </div>
  );
}
