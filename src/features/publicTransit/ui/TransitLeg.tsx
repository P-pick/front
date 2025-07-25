import { TakeTimeToGo } from '@/features/navigate';

import type { PUBLICTRANSIT } from '@/entities/navigate';

interface TransitLegProps {
  leg: PUBLICTRANSIT.TransitLeg;
  isDetail?: boolean;
}

export default function TransitLeg({ leg, isDetail = false }: TransitLegProps) {
  if (isDetail && leg.mode === 'WALK') {
    return (
      <>
        <div className="flex gap-2 justify-start items-start">
          <span className="relative left-1.5 top-1.5 w-3 h-3 bg-white flex justify-center border-3 border-gray-500 items-center rounded-full"></span>
          <div className="pl-2.5">
            <p>{leg.start.name}</p>
            <div className="text-xs text-gray-500 flex gap-1">
              <span>도보 {leg.distance}m</span>
              ·
              <TakeTimeToGo time={leg.sectionTime} isStyled={false} />
            </div>
            <ul className="pl-5 my-1 text-xs text-gray-500">
              {leg.steps &&
                leg.steps.map(step => {
                  return (
                    <li key={step.linestring} className="list-disc my-1">
                      <span>{step.description}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="flex gap-2 justify-start items-start">
          <span className="relative left-1.5 top-1.5 w-3 h-3 bg-white flex justify-center border-3 border-gray-500 items-center rounded-full"></span>
          <div>
            <p className="pl-2.5">{leg.end.name} 도착</p>
          </div>
        </div>
      </>
    );
  }

  if (leg.mode === 'SUBWAY') {
    return (
      <>
        <div className="flex gap-2 justify-start items-start w-full">
          <span
            className="text-white w-4 h-4 p-3 flex justify-center items-center rounded-full"
            style={{ backgroundColor: `#${leg.routeColor}` }}
          >
            {leg.type}
          </span>
          <div className="flex-grow">
            <div className="flex gap-2 justify-start items-center">
              <p>{leg.start.name}역</p>
              <span className="text-xs text-gray-500">
                {leg.passStopList.stationList[1].stationName} 방면
              </span>
            </div>
            {isDetail && leg.passStopList.stationList.length > 2 && (
              <ul className="my-2 p-2 w-full h-auto border-1 border-gray-300 rounded-2xl">
                {leg.passStopList.stationList.slice(1, -1).map(station => (
                  <li
                    key={station.stationName}
                    className="text-xs text-gray-500 my-1"
                    style={{ color: `#${leg.routeColor}` }}
                  >
                    {station.stationName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-start items-start">
          <span
            className="relative left-1.5 top-1.5 w-3 h-3 bg-white flex justify-center items-center rounded-full"
            style={{ border: `3px solid#${leg.routeColor}` }}
          ></span>
          <p className="pl-2.5">{leg.end.name} 하차</p>
        </div>
      </>
    );
  }

  if (leg.mode === 'BUS') {
    const [busType, ...busName] = leg.route.split(':');

    return (
      <>
        <div className="flex gap-2 justify-start items-start">
          <span className="w-4 h-4 p-3 flex justify-center items-center rounded-full bg-sky-950"></span>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 justify-start items-center">
              <p>버스 {leg.start.name}</p>
              <p className="text-xs text-gray-400">{leg.routeId}</p>
            </div>
            <div className="flex gap-1 justify- items-center">
              <span className="text-xs bg-green-500 text-white rounded-sm p-[0.1rem]">
                {busType}
              </span>
              <p className="flex gap-1 items-center">
                {busName.map(name => (
                  <span key={name} className="text-xs text-gray-400">
                    {name}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-start items-start">
          <span className="relative left-1.5 top-1.5 w-3 h-3 bg-white flex justify-center items-center rounded-full border-sky-950 border-3"></span>
          <p className="pl-2.5">{leg.end.name} 하차</p>
        </div>
      </>
    );
  }

  return null;
}
