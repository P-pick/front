import BackButton from '@/pages/geotrip/ui/BackButton';
import MenuIcon from '@/pages/geotrip/ui/MenuIcon';

export default function GeoTripHeader() {
  return (
    <div className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-button)">
      <BackButton />
      <MenuIcon />
    </div>
  );
}
