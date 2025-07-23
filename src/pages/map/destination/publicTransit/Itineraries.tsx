import { gettingConversion } from '../../lib';
import { TakeTimeToGo } from '../components';
import TransitLeg from './TransitLeg';
import type { Itinerary } from './type';

export default function Itineraries({ fare, legs, ...etc }: Itinerary) {
  const totalWalkTime = gettingConversion.conversionSecToHour(
    etc.totalWalkTime,
  );
  return (
    <>
      <TakeTimeToGo time={etc.totalTime} />
      <div>
        <span className="text-xs text-gray-500">
          도보&nbsp;{totalWalkTime.minutes}분
        </span>
        <span className="border-x-1 border-gray-300 mx-1" />
        <span className="text-xs text-gray-500">
          카드&nbsp;
          {fare?.regular.totalFare}
          {fare?.regular.currency.currency}
        </span>
        <span className="border-x-1 border-gray-300 mx-1" />
        <span className="text-xs text-gray-500">
          환승&nbsp;{etc.transferCount}회
        </span>
      </div>
      <ul className="relative before:absolute before:top-0 before:left-2.5 before:bottom-0 before:w-1 before:bg-gray-300">
        {legs.map(leg => {
          return (
            <li className="relative my-2 " key={leg.start.name}>
              <TransitLeg leg={leg} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
