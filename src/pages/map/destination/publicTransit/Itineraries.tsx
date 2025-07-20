import { gettingConversion } from '../../lib';
import TransitLeg from './TransitLeg';
import type { Itinerary } from './type';

interface ItinerariesProps {
  itineraries: Itinerary[];
}

export default function Itineraries({ itineraries }: ItinerariesProps) {
  return (
    <ul className="scroll-auto w-full h-full overflow-y-scroll">
      {itineraries?.map(({ fare, legs, ...etc }) => {
        const takeTimeToGo = gettingConversion.conversionSecToHour(
          etc.totalTime,
        );
        const totalWalkTime = gettingConversion.conversionSecToHour(
          etc.totalWalkTime,
        );
        return (
          <li className="border-b-1 border-gray-300 p-2" key={etc.totalTime}>
            <p className="text-xs">
              {takeTimeToGo && takeTimeToGo.hours > 0 ? (
                <>
                  <span className="text-xl font-bold">
                    {takeTimeToGo.hours}
                  </span>
                  시간&nbsp;
                </>
              ) : (
                ''
              )}
              {takeTimeToGo && (
                <span className="text-xl font-bold">
                  {takeTimeToGo.minutes}
                </span>
              )}
              분
            </p>
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
                  <li className="relative my-2" key={leg.start.name}>
                    <TransitLeg leg={leg} />
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
