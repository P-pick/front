import type { TourInjected } from '@/features/tour/types';

interface DistanceSliderProps {
  distance: string;
  setDistance: (
    value: TourInjected | ((val: TourInjected) => TourInjected),
  ) => void;
}

export default function DistanceSlider({
  distance,
  setDistance,
}: DistanceSliderProps) {
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(prev => ({
      ...prev,
      distance: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex items-center justify-between text-sm text-black mb-1">
        <span>1km</span>
        <span>{distance}m</span>
        <span>20km</span>
      </div>
      <input
        type="range"
        min={'1000'}
        max={'20000'}
        step={'1000'}
        value={distance}
        onChange={handleDistanceChange}
        className="w-full"
      />
    </>
  );
}
