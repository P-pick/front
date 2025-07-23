import { TakeTimeToGo } from '../components';
import TransitLeg from './TransitLeg';
import type { Itinerary } from './type';

interface PublicTransitDetailProps {
  itineraries: Itinerary;
  setSelectedTransitOption: React.Dispatch<React.SetStateAction<number>>;
}

export default function PublicTransitDetail({
  itineraries,
  setSelectedTransitOption,
}: PublicTransitDetailProps) {
  return (
    <div className="absolute bottom-12 left-0 w-full h-1/3 z-(--z-layer2) overflow-y-auto">
      <div className="p-3 rounded-t-lg bg-white">
        <span
          className="cursor-pointer text-xs text-(--color-primary-red)"
          onClick={() => setSelectedTransitOption(-1)}
        >
          목록보기
        </span>
        <div>
          <TakeTimeToGo time={itineraries.totalTime} />
          <span className="text-xs flex justify-start items-center text-gray-400">
            {itineraries.fare.regular.totalFare}
            {itineraries.fare.regular.currency.currency}
          </span>
        </div>
        <ul className="relative before:absolute before:top-0 before:left-2.5 before:bottom-0 before:w-1 before:bg-gray-300">
          {itineraries.legs.map(leg => {
            return (
              <li className="relative my-2 " key={leg.start.name}>
                <TransitLeg leg={leg} isDetail={true} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
