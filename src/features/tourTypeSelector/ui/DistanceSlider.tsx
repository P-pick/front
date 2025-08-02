import type { Dispatch } from 'react';

import type { Distance } from '@/features/tourTypeSelector';

interface DistanceSliderProps {
  distance: number;
  setDistance: Dispatch<React.SetStateAction<Distance>>;
}

export default function DistanceSlider({
  distance,
  setDistance,
}: DistanceSliderProps) {
  return (
    <>
      <div className="flex items-center justify-between text-sm text-black mb-1">
        <span>1km</span>
        <span>20km</span>
      </div>
      <input
        type="range"
        min={1}
        max={20}
        step={1}
        value={distance}
        onChange={e => setDistance(Number(e.target.value) as Distance)}
        className="w-full"
      />
    </>
  );
}
